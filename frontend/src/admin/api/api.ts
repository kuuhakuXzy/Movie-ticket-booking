const BASE_URL = 'http://localhost:5000';

export interface MovieInput {
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
  admin: string;
}

export interface MovieResponse extends MovieInput {
  _id: string;
  createdAt: string;
  updatedAt: string;
}


export interface AdminLoginResponse {
  message: string;
  token: string;
  id: string;
  email: string;
  role: string;
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

  localStorage.setItem('token', data.token); // Save token for future requests

  return data as AdminLoginResponse;
};

export const createMovie = async (formData: FormData): Promise<MovieResponse> => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/admin/movies`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Failed to add movie');
  console.log('Added movie:', data.movie);

  return data.movie as MovieResponse;
};
