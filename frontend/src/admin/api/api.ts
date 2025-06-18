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

  localStorage.setItem('token', data.token); // Save token for future requests

  return data as AdminLoginResponse;
};


export const createMovie = async (movie: MoviePayload): Promise<MovieResponse> => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/movie/add-movie`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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