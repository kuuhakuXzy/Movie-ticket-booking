import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Separator } from "@radix-ui/react-separator";
import { HeartIcon, TicketIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { convertGoogleDriveUrl } from "@/lib/utils";

export default function TabsPanel() {
    const navigate = useNavigate();
    const [movieData, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        axios
            .get<{ movies: Movie[] }>("http://localhost:5000/movie")
            .then((res) => setMovies(res.data.movies))
            .catch((err) => console.error(err));
    }, []);

    const handleBooking = (id: number) => {
        navigate(`/booking/${id}`);
    };

    const renderMovieCard = (item: Movie) => (
        <div key={item.id} className="flex items-center gap-4 mb-10">
            <img
                src={convertGoogleDriveUrl(item.image)}
                alt={`${item.title} Poster`}
                className="w-32 h-48 rounded-lg object-cover cursor-pointer"
            />
            <div>
                <a href="/" className="group">
                    <h1 className="text-2xl font-poppins pb-3 group-hover:underline">
                        {item.title}
                    </h1>
                </a>
                <div className="flex items-center gap-2 font-poppins font-semibold">
                    <p className="text-sm text-gray-500">{item.rating}</p>
                    <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                    <p className="text-sm text-gray-500">{item.duration}</p>
                    <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                    <p className="text-sm text-gray-500">{item.releaseDate}</p>
                </div>
                <h6 className="font-poppins text-md pt-2 text-white">Genres: {item.genres}</h6>
                <p className="font-poppins text-sm pt-2 text-white-grey">{item.description}</p>
                <div className="flex items-center gap-2 pt-4">
                    <button
                        className="flex items-center bg-primary text-white px-4 py-2 rounded-md border-1 font-poppins hover:bg-gray-500 hover:text-jet-black shadow-md cursor-pointer"
                        onClick={() => handleBooking(item.id)}
                    >
                        <TicketIcon className="w-4 h-4 mr-2" />
                        Book Now
                    </button>
                    <button className="flex items-center bg-white-grey text-black px-4 py-2 rounded-md font-poppins hover:text-white hover:bg-jet-black shadow-md cursor-pointer">
                        <HeartIcon className="w-4 h-4 mr-2 text-red-600" />
                        Watchlist
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <Tabs defaultValue="nowshowing" className="w-full">
            <TabsList className="flex justify-start gap-4">
                <TabsTrigger value="nowshowing" className="font-poppins text-2xl cursor-pointer">
                    Now Showing
                </TabsTrigger>
                <TabsTrigger value="comingsoon" className="font-poppins text-2xl cursor-pointer">
                    Coming Soon
                </TabsTrigger>
            </TabsList>

            <TabsContent value="nowshowing" className="ml-8">
                {movieData
                    .filter((item) => item.nowShowing === true)
                    .map(renderMovieCard)}
            </TabsContent>

            <TabsContent value="comingsoon" className="ml-8">
                {movieData
                    .filter((item) => item.nowShowing === false)
                    .map(renderMovieCard)}
            </TabsContent>
        </Tabs>
    );
}
