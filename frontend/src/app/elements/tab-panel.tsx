import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { convertGoogleDriveUrl } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { HeartIcon, TicketIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchComingSoonMovies, fetchNowShowingMovies } from "../api/api";

type Movie = {
    _id: string;
    id: number;
    title: string;
    image: string;
    rating: string;
    duration: string;
    releaseDate: string;
    genres: string;
    description: string;
    nowShowing: boolean;
};

export default function TabsPanel() {
    const [nowShowingMovies, setNowShowingMovies] = useState<Movie[]>([]);
    const [comingSoonMovies, setComingSoonMovies] = useState<Movie[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNowShowingMovies()
            .then(setNowShowingMovies)
            .catch(console.error);

        fetchComingSoonMovies()
            .then(setComingSoonMovies)
            .catch(console.error);
        }, []);

    const handleBooking = (_id: string) => {
        navigate(`/booking/${_id}`);
    }

    return (
        <Tabs defaultValue ="nowshowing" className="w-full">
            <TabsList className="flex justify-start gap-4">
                <TabsTrigger value="nowshowing" className="font-poppins text-2xl cursor-pointer">
                Now Showing
                </TabsTrigger>
                <TabsTrigger value="comingsoon" className="font-poppins text-2xl cursor-pointer">
                Coming Soon
                </TabsTrigger>
            </TabsList>
            <TabsContent value="nowshowing" className="ml-8">
                {nowShowingMovies.map((movie, index) => (
                    <div key={index} className="flex items-center gap-4 mb-10">
                        <img
                            src={convertGoogleDriveUrl(movie.image)}
                            alt={`${movie.title} Poster`}
                            className="w-32 h-48 rounded-lg object-cover cursor-pointer"
                        />
                        <div>
                            <Link to="/" className="group">
                                <h1 className="text-2xl font-poppins pb-3 group-hover:underline">
                                    {movie.title}
                                </h1>
                            </Link>
                                <div className="flex items-center gap-2 font-poppins font-semibold">
                                    <p className="text-sm text-gray-500">{movie.rating}</p>
                                    <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                                    <p className="text-sm text-gray-500">{movie.duration}</p>
                                    <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                                    <p className="text-sm text-gray-500">{new Date(movie.releaseDate).toDateString()}</p>
                                </div>
                                <h6 className="font-poppins text-md pt-2 text-white">Genres: {movie.genres}</h6>
                                <p className="font-poppins text-sm pt-2 text-white-grey">{movie.description}</p>
                            <div className="flex items-center gap-2 pt-4">
                                    <button
                                        className="flex items-center bg-primary text-white px-4 py-2 rounded-md border-1 font-poppins hover:bg-gray-500 hover:text-jet-black shadow-md cursor-pointer"
                                        onClick={() => handleBooking(movie._id)}
                                    >
                                        <TicketIcon className="w-4 h-4 mr-2" />
                                        Book Now
                                    </button>
                                    <button className="flex items-center bg-white-grey   text-black px-4 py-2 rounded-md font-poppins hover:text-white hover:bg-jet-black shadow-md cursor-pointer">
                                        <HeartIcon className="w-4 h-4 mr-2 text-red-600" />
                                        Watchlist
                                    </button>
                            </div>
                        </div>
                    </div>
                ))}
            </TabsContent>
            <TabsContent value="comingsoon" className="ml-8">
                {comingSoonMovies.map((movie, index) => (
                    <div key={index} className="flex items-center gap-4 mb-10">
                        <img
                            src={convertGoogleDriveUrl(movie.image)}
                            alt={`${movie.title} Poster`}
                            className="w-32 h-48 rounded-lg object-cover cursor-pointer"
                        />
                        <div>
                        <div className="group">
                            <h1 className="text-2xl font-poppins pb-3 group-hover:underline">
                            {movie.title}
                            </h1>
                        </div>
                        <div className="flex items-center gap-2 font-poppins font-semibold">
                            <p className="text-sm text-gray-500">{movie.rating}</p>
                            <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                            <p className="text-sm text-gray-500">{movie.duration}</p>
                            <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                            <p className="text-sm text-gray-500">{new Date(movie.releaseDate).toDateString()}</p>
                        </div>
                        <h6 className="font-poppins text-md pt-2 text-white">Genres: {movie.genres}</h6>
                        <p className="font-poppins text-sm pt-2 text-white-grey">{movie.description}</p>
                        <div className="flex items-center gap-2 pt-4">
                            <button
                            className="flex items-center bg-white-grey text-black px-4 py-2 rounded-md font-poppins hover:text-white hover:bg-jet-black shadow-md cursor-pointer"
                            disabled
                            >
                            Coming Soon
                            </button>
                            <button className="flex items-center bg-white-grey text-black px-4 py-2 rounded-md font-poppins hover:text-white hover:bg-jet-black shadow-md cursor-pointer">
                            <HeartIcon className="w-4 h-4 mr-2 text-red-600" />
                            Watchlist
                            </button>
                        </div>
                        </div>
                    </div>
                    ))}
                </TabsContent>
        </Tabs>
    );
}

