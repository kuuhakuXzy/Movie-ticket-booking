const BASE_URL = 'http://localhost:5000';

export type BookingPayload = {
    showtimeId: string;
    seats: {
        seatNumber: string;
        price: number;
    }[];
    foodDrinks: {
        item: string;
        quantity: number;
        price: number;
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
    seats: { seatNumber: string; price: number}[];
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
    _id?: string;
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

export const createBooking = async (
    bookingData: BookingPayload
): Promise<BookingResponse> => {
    const token = localStorage.getItem("userToken");
    if (!token) throw new Error("Unauthorized: No token found");

    console.log("Sending booking to:", `${BASE_URL}/booking/createBooking`);

    const res = await fetch(`${BASE_URL}/booking/createBooking`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
    });

    console.log("Booking data being sent:", bookingData);

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to create booking');
    }

    const data = await res.json();

    return data.booking;
};

export const fetchShowtimesbyId = async (movieId: string) => {
    const res = await fetch(`${BASE_URL}/showtime/${movieId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch movies');
    }
    const data = await res.json();
    return data.showtimes;
}

export const fetchAllFoodDrinks = async () => {
    const res = await fetch(`${BASE_URL}/food-drink/all`);

    if (!res.ok) {
        throw new Error('Failed to fetch food and drinks');
    }
    const data = await res.json();
    return data.foodDrink;
}

export const fetchUserBooking = async (userId: string) => {
    const token = localStorage.getItem("userToken");
    if (!token) throw new Error("Unauthorized: No token found");

    const res = await fetch(`${BASE_URL}/booking/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch user bookings");
    }

    const data = await res.json();
    return data.bookings;
};

export const userSignup = async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to signup user');
    }
    const data = await res.json();
    return data;
}