const BASE_URL = 'http://localhost:5000';

type MoviePayload = {
  _id: string;
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

export interface ShowtimeData {
  movieId: string;
  cinema: string;
  hall: "Hall 1" | "Hall 2" | "Hall 3";
  date: string;         // format: YYYY-MM-DD
  startTime: string;    // format: HH:mm
  endTime: string;      // format: HH:mm
  price: number;
}

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

export const createShowtime = async (showtimeData: ShowtimeData, token: string) => {
  const response = await fetch(`${BASE_URL}/showtime/addShowtime`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(showtimeData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create showtime");
  }

  const data = await response.json();
  return data.showtime;
};

