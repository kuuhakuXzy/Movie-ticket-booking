const BASE_URL = 'http://localhost:5000';

export const fetchMovies = async () => {
    const res = await fetch(`${BASE_URL}/movie/all-movies`);

    if (!res.ok) {
        throw new Error('Failed to fetch movies');
    }
    const data = await res.json();
    return data.movies;
};

export const fetchNowShowingMovies = async () => {
    const res = await fetch(`${BASE_URL}/movie/all-movies?nowShowing=true`);
    if (!res.ok) throw new Error("Failed to fetch now showing movies");
    const data = await res.json();
    return data.movies;
};

export const fetchComingSoonMovies = async () => {
    const res = await fetch(`${BASE_URL}/movie/all-movies?nowShowing=false`);
    if (!res.ok) throw new Error("Failed to fetch coming soon movies");
    const data = await res.json();
    return data.movies;
};

export const fetchFoodDrink = async () => {
    const res = await fetch(`${BASE_URL}/food-drink/all`);

    if (!res.ok) {
        throw new Error('Failed to fetch food and drinks');
    }
    const data = await res.json();
    return data.foodDrink;
}

type LoginPayload = {
    email: string;
    password: string;
};

export const userLogin = async (payload: LoginPayload) => {
    const res = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to login user');
    }

    const data = await res.json();
    return data;
};
