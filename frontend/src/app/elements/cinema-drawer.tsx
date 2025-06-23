import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { CheckCircle2, CirclePlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNowShowingMovies } from "../api/api";

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

const STATES = ["WCT", "ACT", "NSW", "QLD", "SAT", "VIC", "EDG", "HLE", "DRX"];
const CINEMAS = [
    "BANKSTOWN", "BLACKTOWN", "BROADWAY", "CHARLESTOWN",
    "CHATSWOOD", "WESTFIELD", "CRONULLA", "EASTGARDENS",
    "QUARTER", "ERINA", "GREEN HILLS", "MT DRUITT",
    "PENRITH", "TWEED CITY"
];

export default function CinemaDrawer() {
    const [selectedState, setSelectedState] = useState("NSW");
    const [selectedCinemas, setSelectedCinemas] = useState<string[]>([]);
    const [movie, setMovie] = useState<Movie | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNowShowingMovies()
            .then((movies: Movie[]) => {
                const matched = movies.find((m: Movie) => m.title);
                setMovie(matched || null);
            })
            .catch(console.error);
    }, []);

    const toggleCinema = (cinema: string) => {
        setSelectedCinemas((prev) =>
            prev.includes(cinema)
                ? prev.filter((c) => c !== cinema)
                : [...prev, cinema]
        );
    };

    const clearSelection = () => setSelectedCinemas([]);

    const handleSaveAndBrowse = () => {
        if (selectedCinemas.length === 0) {
            alert("Please select at least one cinema.");
            return;
        }

        if (!movie?._id) {
            alert("Movie ID not available.");
            return;
        }
        navigate(`/showtime/${movie._id}`);
    };

    return (
        <>
            <Drawer direction="right">
                <DrawerTrigger asChild>
                    <button className="rounded flex items-center gap-2 cursor-pointer">
                        <div className="font-poppins text-red-600 font-semibold">
                            {selectedCinemas.length > 0 ? selectedCinemas[0] : "Select Cinema"}
                        </div>
                        <CirclePlus className="h-4 w-4" />
                    </button>
                </DrawerTrigger>

                <DrawerContent className="bg-black text-white px-6 py-4 max-w-md w-full">
                    <DrawerHeader className="flex items-center justify-between mb-4">
                        <DrawerTitle className="font-semibold text-lg">Select Cinemas</DrawerTitle>
                        <DrawerClose asChild>
                            <button><X className="w-5 h-5" /></button>
                        </DrawerClose>
                    </DrawerHeader>

                    <div className="flex gap-4 mb-4 border-b border-gray-700 pb-2 mx-auto overflow-x-auto">
                        {STATES.map((state) => (
                            <button
                                key={state}
                                className={`text-sm font-semibold uppercase whitespace-nowrap ${
                                    selectedState === state
                                        ? "border-b-2 border-red-500 text-red-500"
                                        : "text-gray-400"
                                }`}
                                onClick={() => setSelectedState(state)}
                            >
                                {state}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {CINEMAS.map((cinema) => {
                            const isSelected = selectedCinemas.includes(cinema);
                            return (
                                <button
                                    key={cinema}
                                    onClick={() => toggleCinema(cinema)}
                                    className={`flex items-center justify-between text-sm px-3 py-2 border rounded ${
                                        isSelected
                                            ? "bg-red-600 text-white border-red-500"
                                            : "bg-gray-800 border-gray-600"
                                    }`}
                                >
                                    {cinema}
                                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-6">
                        <Button
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                            onClick={handleSaveAndBrowse}
                        >
                            SAVE & BROWSE
                        </Button>
                        <p
                            className="text-center mt-2 text-sm text-red-400 underline cursor-pointer"
                            onClick={clearSelection}
                        >
                            Clear selection
                        </p>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}
