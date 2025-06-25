import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppSidebar from "@/app/elements/app-sidebar";
import { Footer } from "@/app/elements/footer";
import { Header } from "@/app/elements/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { convertGoogleDriveUrl } from "@/lib/utils";
import { fetchNowShowingMovies } from "../api/api";
import CinemaDrawer from "../elements/cinema-drawer";

type Movie = {
    _id: string;
    id: number;
    title: string;
    wallpaper: string;
    image: string;
    releaseDate: string;
    rating: string;
    duration: string;
    genres: string;
    description: string;
};

export default function BookingPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        fetchNowShowingMovies()
        .then((movies) => {
            const matched: Movie | undefined = movies.find(
            (m: Movie) => String(m._id) === id
            );
            setMovie(matched || null);
        })
        .catch(console.error);
    }, [id]);

    if (!movie) return <div className="p-10 text-white">Movie not found.</div>;

    return (
        <div className="bg-jet-black min-h-screen text-white">
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <div className="flex flex-col w-full">
            <Header />

            {/* Wallpaper Section */}
            <div className="relative w-full">
                <img
                src={convertGoogleDriveUrl(movie.wallpaper)}
                alt="Wallpaper"
                className="w-full h-[400px] object-cover"
                />
            </div>

            {/* Movie Info Section */}
            <div className="relative flex gap-8 px-10 py-8 bg-jet-black">
                <img
                src={convertGoogleDriveUrl(movie.image)}
                alt="Poster"
                className="w-[200px] h-[300px] object-cover rounded shadow-lg"
                />
                <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
                <p className="font-poppins text-lg text-gray-300 mt-2">
                    {new Date(movie.releaseDate).toDateString()} • {movie.rating} • {movie.duration}
                </p>
                <p className="font-poppins text-md text-white mt-4">
                    <strong>Genres:</strong> {movie.genres}
                </p>
                <p className="font-poppins text-md text-white mt-2">
                    <strong>Description:</strong> {movie.description}
                </p>
                </div>
            </div>

            {/* Showtimes Section */}
            <div className="px-10 py-6">
                <h2 className="text-2xl font-poppins mb-4">Times & Tickets</h2>
                <CinemaDrawer />
            </div>

            <Footer />
            </div>
        </SidebarProvider>
        </div>
    );
}
