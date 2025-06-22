import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppSidebar from "@/app/elements/app-sidebar";
import { Footer } from "@/app/elements/footer";
import { Header } from "@/app/elements/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { fetchNowShowingMovies } from "../api/api";
import CinemaDrawer from "../elements/cinema-drawer";
import { convertGoogleDriveUrl } from "@/lib/utils";

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
            const matched: Movie | undefined = movies.find((m: Movie) => String(m._id) === id);
            setMovie(matched || null);
        })
        .catch(console.error);
    }, [id]);

    if (!movie) return <div className="p-10 text-white">Movie not found.</div>;

    return (
        <div className="bg-jet-black min-h-screen text-white flex">
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <div className="flex-1 flex flex-col">
            <Header />

            <div className="relative w-full">
                <img
                src={movie.wallpaper}
                alt="Wallpaper"
                className="w-full h-[400px] object-cover"
                />

                <img
                src={convertGoogleDriveUrl(movie.image)}
                alt="Poster"
                className="absolute bottom-0 left-0 w-[200px] h-[300px] scale-75 object-cover rounded shadow-lg"
                />

                <div className="absolute bottom-0 left-40 p-10 w-full h-full flex flex-col justify-end items-start">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
                <p className="font-poppins text-lg text-gray-300 mt-2">
                    {new Date(movie.releaseDate).toDateString()} • {movie.rating} • {movie.duration}
                </p>
                <p className="font-poppins text-md text-white mt-2">
                    <strong>Genres:</strong> {movie.genres}
                </p>
                <p className="font-poppins text-md text-white mt-2">
                    <strong>Description:</strong> {movie.description}
                </p>
                </div>
            </div>

            <div className="flex flex-col px-10 py-8">
                <div className="text-2xl font-poppins mb-3">Times & Tickets</div>
                <CinemaDrawer/>
            </div>

            <Footer />
            </div>
        </SidebarProvider>
        </div>
    );
}
