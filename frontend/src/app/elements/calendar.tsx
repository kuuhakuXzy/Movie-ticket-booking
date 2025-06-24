import AppSidebar from "@/app/elements/app-sidebar";
import { Footer } from "@/app/elements/footer";
import Header from "@/app/elements/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { convertGoogleDriveUrl } from "@/lib/utils";
import { Clock, DollarSign, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNowShowingMovies, fetchShowtimesbyId } from "../api/api";
import SeatDrawer from "./seat-drawer";

type Showtime = {
    _id?: string;
    movie: { _id: string; title: string };
    cinema: string;
    hall: string;
    date: string;
    startTime: string;
    endTime: string;
    price: number;
};

type Movie = {
    _id: string;
    title: string;
    image: string;
    wallpaper: string;
    rating: string;
    duration: string;
    releaseDate: string;
    genres: string[];
    description: string;
};


export function Calendar() {
    const { movieId } = useParams();
    const [showtimes, setShowtimes] = useState<Showtime[]>([]);
    const [movie, setMovie] = useState<Movie>();

    const [selectedShowtime, setSelectedShowtime] = useState<Showtime>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        if (!movieId) return;

        fetchShowtimesbyId(movieId)
        .then((data) => {
            const validData = Array.isArray(data) ? data : [];
            setShowtimes(validData);
        })
        .catch(console.error);

        fetchNowShowingMovies()
        .then((movies) => {
            const matched = movies.find((m: Movie) => m._id === movieId);
            setMovie(matched || null);
        })
        .catch(console.error);
    }, [movieId]);

    return (
    <div className="bg-jet-black min-h-screen text-white">
        <SidebarProvider defaultOpen={false}>
        <AppSidebar />

        <div className="flex flex-col w-full">
            <Header />

            {/* Wallpaper Banner */}
            {movie && (
            <div className="relative w-full">
                <img
                src={convertGoogleDriveUrl(movie.wallpaper)}
                alt="Wallpaper"
                className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            )}

            {/* Movie Info Section */}
            {movie && (
            <div className="flex gap-8 px-10 py-8">
                {/* Poster */}
                <img
                src={convertGoogleDriveUrl(movie.image)}
                alt="Poster"
                className="w-[200px] h-[300px] object-cover rounded shadow-lg"
                />

                {/* Movie Details */}
                <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
                <p className="font-poppins text-lg text-gray-300 mt-2">
                    {new Date(movie.releaseDate).toDateString()} • {movie.rating} • {movie.duration}
                </p>
                <p className="font-poppins text-md text-white mt-4">
                    <strong>Genres:</strong> {movie.genres.join(", ")}
                </p>
                <p className="font-poppins text-md text-white mt-2">
                    <strong>Description:</strong> {movie.description}
                </p>
                </div>
            </div>
            )}

            {/* Showtimes Section */}
            <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Available Showtimes</h1>
            {showtimes.length === 0 ? (
                <p className="text-gray-400">No showtimes available.</p>
            ) : (
                <div className="flex gap-3 flex-wrap justify-center">
                {showtimes.map((showtime) => (
                    <button
                    key={showtime._id}
                    onClick={() => {
                        setSelectedShowtime(showtime);
                        setIsDrawerOpen(true);
                    }}
                    className="bg-white rounded-2xl shadow-lg p-4 w-[210px] hover:scale-105 transition-transform duration-200"
                    >
                    <h2 className="text-lg font-bold text-gray-800 mb-2 text-center">
                        {new Date(showtime.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        })}
                    </h2>

                    <div className="flex items-center text-gray-600 text-sm mb-1">
                        <Clock className="w-4 h-4 mr-2" />
                        {showtime.startTime} – {showtime.endTime}
                    </div>

                    <div className="flex items-center text-gray-600 text-sm mb-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        {showtime.cinema} – {showtime.hall}
                    </div>

                    <div className="flex items-center text-gray-700 text-sm font-medium">
                        <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                        {showtime.price.toLocaleString()} VND
                    </div>
                    </button>
                ))}
                </div>
            )}

            {/* Seat Drawer */}
            <SeatDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                showtime={
                selectedShowtime
                    ? {
                        ...selectedShowtime,
                        movie: {
                        ...selectedShowtime.movie,
                        image: convertGoogleDriveUrl(movie?.image || ""),
                        title: movie?.title || "",
                        duration: movie?.duration || "",
                        releaseDate: movie?.releaseDate || "",
                        },
                    }
                    : null
                }
            />
            </div>

            <Footer />
        </div>
        </SidebarProvider>
    </div>
);
}