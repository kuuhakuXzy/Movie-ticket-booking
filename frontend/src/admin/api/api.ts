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

export const addMovie = async (movie: MovieInput): Promise<MovieResponse> => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/movie`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
    body: JSON.stringify(movie),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Failed to add movie');
  console.log('Added movie:', data.movie);

  return data.movie as MovieResponse;
};
