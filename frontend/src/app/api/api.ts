const BASE_URL = 'http://localhost:5000';

export const fetchMovies = async () => {
    const res = await fetch(`${BASE_URL}/movie/all-movies`);

    if (!res.ok) {
        throw new Error('Failed to fetch movies');
    }
    const data = await res.json();
    return data.movies;
};
