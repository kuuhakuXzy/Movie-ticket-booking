import AppDrawer from "@/app/components/app-drawer";
import AppSidebar from "@/app/components/app-sidebar";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { movieData } from "@/data/movieData";
import { useParams } from "react-router-dom";

export default function BookingPage() {
    const { id } = useParams();
    const movie = movieData.find((item) => item.id === Number(id));

    console.log("useParams id:", id);
    console.log("All movie IDs:", movieData.map((m) => m.id));

    if (!movie) return "0"

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
                src={movie.image}
                alt="Poster"
                className="absolute bottom-0 left-0 w-[200px] h-[300px] scale-75 object-cover rounded shadow-lg"
                />

                <div className="absolute bottom-0 left-40 p-10 w-full h-full flex flex-col justify-end items-start">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
                <p className="font-poppins text-lg text-gray-300 mt-2">
                    {movie.releaseDate} • {movie.rating} • {movie.duration}
                </p>
                <p className="font-poppins text-md text-white mt-2"><strong>Genres:</strong> {movie.genres}</p>
                <p className="font-poppins text-md text-white mt-2"><strong>Description:</strong> {movie.description}</p>
                </div>
            </div>

            <div className="flex flex-col px-10 py-8">
                <div className="text-2xl font-poppins mb-3">Times & Tickets</div>
                <AppDrawer />
            </div>
            <Footer/>
            </div>
        </SidebarProvider>
        </div>
    );
}
