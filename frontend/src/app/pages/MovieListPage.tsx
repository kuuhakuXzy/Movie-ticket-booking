import AppSidebar from "@/app/elements/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { convertGoogleDriveUrl } from "@/lib/utils";
import { Film } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchComingSoonMovies, fetchNowShowingMovies } from "../api/api";
import { Link } from "react-router-dom";

type Movie = {
    _id: string;
    id: number;
    title: string;
    image: string;
    rating: string;
    duration: string;
    releaseDate: string;
    genres: string[];
    description: string;
    nowShowing: boolean;
};

export default function MovieListPage() {
  const [nowShowingMovies, setNowShowingMovies] = useState<Movie[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<Movie[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const id = user?.id ?? "guest";

  useEffect(() => {
    fetchNowShowingMovies()
      .then(setNowShowingMovies)
      .catch(console.error);

    fetchComingSoonMovies()
      .then(setComingSoonMovies)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-jet-black min-h-screen text-white flex">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <div className="flex-1 flex flex-col p-6">
          <Link to={`/${id}`} className="flex items-center gap-2 mb-8">
            <Film className="h-10 w-10 text-red-600" />
            <div className="text-3xl font-alfa text-red-500">CineBook</div>
          </Link>

          <h1 className="text-3xl font-bold mb-6">Now Showing</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {nowShowingMovies.map((movie: Movie) => (
              <div
                key={movie._id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition"
              >
                <img
                  src={convertGoogleDriveUrl(movie.image)}
                  alt={movie.title}
                  className="w-full h-[350px] object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                  <p className="text-sm text-gray-400">{movie.genres.join(", ")}</p>
                  <p className="text-sm mt-2 line-clamp-3">{movie.description}</p>
                  <div className="mt-4 flex justify-between text-sm text-gray-300">
                    <span>{movie.rating}</span>
                    <span>{movie.duration}</span>
                    <span>{new Date(movie.releaseDate).toDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h1 className="text-3xl font-bold mb-6">Coming Soon</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonMovies.map((movie: Movie) => (
              <div
                key={movie._id}
                className="bg-gray-700 rounded-lg overflow-hidden shadow-lg opacity-70"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[300px] object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                  <p className="text-sm text-gray-300">{movie.genres.join(", ")}</p>
                  <p className="text-sm mt-2 line-clamp-3">{movie.description}</p>
                  <div className="mt-4 flex justify-between text-sm text-gray-300">
                    <span>{movie.rating}</span>
                    <span>{movie.duration}</span>
                    <span>{new Date(movie.releaseDate).toDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
