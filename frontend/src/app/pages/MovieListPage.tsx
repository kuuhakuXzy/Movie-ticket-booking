import { useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/app/elements/app-sidebar';
import { Film } from 'lucide-react';
import axios from 'axios';
import { convertGoogleDriveUrl } from '@/lib/utils';

interface Movie {
    _id: string;
    title: string;
    description: string;
    image: string;
    wallpaper: string;
    rating: string;
    duration: string;
    releaseDate: string;
    genres: string;
    isNowShowing: boolean;
    isComingSoon: boolean;
}

export default function MovieListPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/movie/now-showing');
                setMovies(response.data.movies);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch movies');
                setLoading(false);
                console.error('Error fetching movies:', err);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return (
            <div className="bg-jet-black min-h-screen text-white flex items-center justify-center">
                <div className="text-xl">Loading movies...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-jet-black min-h-screen text-white flex items-center justify-center">
                <div className="text-xl text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-jet-black min-h-screen text-white flex">
            <SidebarProvider defaultOpen={true}>
                <AppSidebar />
                <div className="flex-1 flex flex-col p-6">
                    <a href="/" className="flex items-center gap-2 mb-8">
                        <Film className="h-10 w-10 text-red-600" />
                        <div className="text-3xl font-alfa text-red-500">CineBook</div>
                    </a>
                    <h1 className="text-3xl font-bold mb-6">Now Showing</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {movies.map((movie) => (
                            <div
                                key={movie._id}
                                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                            >
                                <img
                                    src={convertGoogleDriveUrl(movie.image)}
                                    alt={movie.title}
                                    className="w-full h-[300px] object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                                    <p className="text-sm text-gray-400">{movie.genres}</p>
                                    <p className="text-sm mt-2">{movie.description}</p>
                                    <div className="mt-4 flex justify-between text-sm text-gray-300">
                                        <span>{movie.rating}</span>
                                        <span>{movie.duration}</span>
                                        <span>{movie.releaseDate}</span>
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