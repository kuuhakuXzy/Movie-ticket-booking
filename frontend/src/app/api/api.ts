const BASE_URL = import.meta.env.VITE_API_URL;


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

export const createBooking = async (
    bookingData: BookingPayload
): Promise<BookingResponse> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: No token found");

    const res = await fetch(`${BASE_URL}/booking/createBooking`, {
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

export const fetchShowtimesbyId = async (movieId: string) => {
    const res = await fetch(`${BASE_URL}/showtime/${movieId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch movies');
    }
    const data = await res.json();
    return data.showtimes;
}

export const getUserBookings = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings/user/${userId}`);
    const data = await response.json();
    return data.bookings;
  } catch (error) {
    console.error('Failed to fetch user bookings:', error);
    throw new Error('Failed to fetch user bookings');
  }
};