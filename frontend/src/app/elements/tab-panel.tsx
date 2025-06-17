import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-separator";
import { HeartIcon, TicketIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/api";
const BASE_URL = 'http://localhost:5000';

type Movie = {
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
    const [movies, setMovies] = useState<Movie[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies()
        .then((data) => {
            console.log('Fetched movies:', data);
            setMovies(data);
        })
        .catch(console.error);
    }, []);

    const handleBooking = (id: number) => {
        navigate(`/booking/${id}`);
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
                {movies.map((data, index) => (
                    <>
                        <div key={index} className="flex items-center gap-4 mb-10">
                                <img
                                    src={`${BASE_URL}${data.image}`}
                                    alt={`${data.title} Poster`}
                                    className="w-32 h-48 rounded-lg object-cover cursor-pointer"
                                />
                            <div>
                                <Link to="/" className="group">
                                    <h1 className="text-2xl font-poppins pb-3 group-hover:underline">
                                        {data.title}
                                    </h1>
                                </Link>
                                    <div className="flex items-center gap-2 font-poppins font-semibold">
                                        <p className="text-sm text-gray-500">{data.rating}</p>
                                        <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                                        <p className="text-sm text-gray-500">{data.duration}</p>
                                        <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                                        <p className="text-sm text-gray-500">{data.releaseDate}</p>
                                    </div>
                                    <h6 className="font-poppins text-md pt-2 text-white">Genres: {data.genres}</h6>
                                    <p className="font-poppins text-sm pt-2 text-white-grey">{data.description}</p>
                                    <div className="flex items-center gap-2 pt-4">
                                        <button
                                            className="flex items-center bg-primary text-white px-4 py-2 rounded-md border-1 font-poppins hover:bg-gray-500 hover:text-jet-black shadow-md cursor-pointer"
                                            onClick={() => handleBooking(data.id)}
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
                    </>
                ))}
            </TabsContent>
            <TabsContent value="comingsoon" className="ml-8">
                {movies
                    .filter(movie => !movie.nowShowing)
                    .map((data, index) => (
                    <div key={index} className="flex items-center gap-4 mb-10">
                        <img
                            src={`${BASE_URL}${data.image}`}
                            alt={`${data.title} Poster`}
                            className="w-32 h-48 rounded-lg object-cover cursor-pointer"
                        />
                        <div>
                        <a href="/" className="group">
                            <h1 className="text-2xl font-poppins pb-3 group-hover:underline">
                            {data.title}
                            </h1>
                        </a>
                        <div className="flex items-center gap-2 font-poppins font-semibold">
                            <p className="text-sm text-gray-500">{data.rating}</p>
                            <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                            <p className="text-sm text-gray-500">{data.duration}</p>
                            <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                            <p className="text-sm text-gray-500">{data.releaseDate}</p>
                        </div>
                        <h6 className="font-poppins text-md pt-2 text-white">Genres: {data.genres}</h6>
                        <p className="font-poppins text-sm pt-2 text-white-grey">{data.description}</p>
                        <div className="flex items-center gap-2 pt-4">
                            <button
                            className="flex items-center bg-white-grey text-black px-4 py-2 rounded-md font-poppins hover:text-white hover:bg-jet-black shadow-md cursor-pointer"
                            disabled
                            >
                            <TicketIcon className="w-4 h-4 mr-2" />
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

