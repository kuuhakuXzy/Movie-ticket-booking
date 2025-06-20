const BASE_URL = 'http://localhost:5000';

type MoviePayload = {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
  wallpaper: string;
  rating: string;
  duration: string;
  genres: string;
  nowShowing: boolean;
};

type MovieResponse = {
  _id: string;
  id: number;
  title: string;
  image: string;
  wallpaper: string;
  rating: string;
  duration: string;
  releaseDate: string;
  genres: string[];
  description: string;
  nowShowing: boolean;
};

export type BookingPayload = {
  showtimeId: string;
  seatIds: string[];
  foodDrinks: {
    item: string;
    quantity: number;
  }[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: "cash" | "credit_card" | "momo" | "zalo";
};

export type BookingResponse = {
  _id: string;
  user: string;
  showtime: string;
  seats: { seatNumber: string; price: number }[];
  foodDrinks: { item: string; quantity: number; price: number }[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  totalAmount: number;
  paymentMethod: string;
  bookingReference: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
};


export interface AdminLoginResponse {
  message: string;
  token: string;
  id: string;
  email: string;
  role: string;
}

type FoodDrinkPayload = {
  name: string;
  description: string;
  price: string;
  category: 'Food' | 'Drink' | 'Combo';
  image: string;
  isAvailable: boolean;
};

type FoodDrinkResponse = {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: 'Food' | 'Drink' | 'Combo';
  image: string;
  isAvailable: boolean;
};

export const adminLogin = async (
  email: string,
  password: string
): Promise<AdminLoginResponse> => {
  const response = await fetch(`${BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  console.log("hello");

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  localStorage.setItem('token', data.token);

  return data as AdminLoginResponse;
};


export const createMovie = async (movie: MoviePayload): Promise<MovieResponse> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No token found in localStorage");

  const response = await fetch(`${BASE_URL}/movie/addMovie`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(movie),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Failed to add movie');
  console.log('Added movie:', data.movie);

  return data.movie as MovieResponse;
};

export const createFoodDrink = async (foodDrink: FoodDrinkPayload): Promise<FoodDrinkResponse> => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/food-drink/add-foodDrink`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(foodDrink),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Failed to add food and drinks');
  console.log('Added food/drink:', data.foodDrink);

  return data.foodDrink as FoodDrinkResponse;
};

export const createBooking = async (
  bookingData: BookingPayload
): Promise<BookingResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  const res = await fetch(`${BASE_URL}/booking/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create booking");
  }

  return data.booking;
};