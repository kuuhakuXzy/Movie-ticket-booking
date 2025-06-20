import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@radix-ui/react-separator";
import { Armchair, CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNowShowingMovies } from "../api/api";
import SeatLegend from "./seat-legend";

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

export default function SeatDrawer() {
    const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
    const [cartOpen, setCartOpen] = useState(false);
    const [nowShowingMovies, setNowShowingMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchNowShowingMovies()
            .then((movies) => {
                setNowShowingMovies(movies);
                setSelectedMovie(movies[0] || null);
            })
            .catch(console.error);
    }, []);

    const rows = 10;
    const cols = 10;
    const colLetters = "ABCDEFGHIJ";
    const seatPrice = 100_000;
    const totalPrice = selectedSeats.size * seatPrice;

    function toggleSeat(row: number, col: number) {
        const seatId = `${row + 1}${colLetters[col]}`;
        setSelectedSeats((prev) => {
            const newSelected = new Set(prev);
            if (newSelected.has(seatId)) {
                newSelected.delete(seatId);
            } else {
                newSelected.add(seatId);
            }
            return newSelected;
        });
    }

    const handleProceed = () => {
        const seatsParam = encodeURIComponent(JSON.stringify(Array.from(selectedSeats)));
        const priceParam = seatPrice;
        navigate(`/checkout?seats=${seatsParam}&price=${priceParam}`);
    };

    return (
        <>
            <Drawer direction="right">
                <DrawerTrigger asChild>
                    <button className="rounded flex items-center gap-2 cursor-pointer">
                        <div className="font-poppins text-red-600">Select Cinema</div>
                        <CirclePlus className="h-4 w-4" />
                    </button>
                </DrawerTrigger>

                <DrawerContent className="bg-zinc-900 border-0 text-white">
                    <DrawerHeader className="ml-2">
                        <DrawerTitle className="font-poppins">{selectedMovie?.title}</DrawerTitle>
                    </DrawerHeader>

                    {/* Movie selection */}
                    <div className="flex gap-4 px-4 overflow-x-auto py-2">
                        {nowShowingMovies.map((movie) => (
                            <button
                                key={movie.id}
                                onClick={() => setSelectedMovie(movie)}
                                className={`flex-shrink-0 border px-3 py-1 rounded ${
                                    selectedMovie?.id === movie.id
                                        ? "bg-red-600 text-white border-red-500"
                                        : "bg-gray-800 text-gray-300 border-gray-600"
                                }`}
                            >
                                {movie.title}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-center px-2 pb-28">
                        <div>
                            <div className="w-full h-6 bg-gray-700 rounded-md text-center text-white font-semibold mb-2">
                                SCREEN
                            </div>

                            <div className="flex items-center gap-2 ml-2 mb-1">
                                <div className="w-6" />
                                {Array.from({ length: cols }).map((_, colIndex) => (
                                    <div key={colIndex} className="flex items-center">
                                        <div className="w-6 h-6 text-center text-sm font-bold select-none">
                                            {colLetters[colIndex]}
                                        </div>
                                        {colIndex === 4 && <div className="w-10" />} {/* Middle aisle */}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2">
                                {Array.from({ length: rows }).map((_, rowIndex) => (
                                    <div key={rowIndex} className="flex items-center gap-2 ml-2">
                                        <div className="w-6 text-center text-sm font-bold">{rowIndex + 1}</div>

                                        {Array.from({ length: cols }).map((_, colIndex) => {
                                            const seatId = `${rowIndex + 1}${colLetters[colIndex]}`;
                                            const isSelected = selectedSeats.has(seatId);

                                            return (
                                                <div key={colIndex} className="flex items-center">
                                                    <div
                                                        className="w-6 h-6 cursor-pointer"
                                                        onClick={() => toggleSeat(rowIndex, colIndex)}
                                                        title={seatId}
                                                    >
                                                        <Armchair
                                                            className={`w-6 h-6 ${
                                                                isSelected ? "text-blue-500" : "text-white"
                                                            }`}
                                                        />
                                                    </div>
                                                    {colIndex === 4 && <div className="w-10" />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>

                            {selectedSeats.size > 0 && (
                                <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 px-4 py-3 border-t border-gray-700 z-50">
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setCartOpen(true)}
                                            className="border border-white text-white px-4 py-2 rounded flex flex-col items-start hover:bg-white hover:text-black transition"
                                        >
                                            <span className="text-sm font-bold">View Cart</span>
                                            <span className="text-xs">
                                                {selectedSeats.size} seat{selectedSeats.size > 1 ? "s" : ""} selected
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            <SeatLegend />
                        </div>
                    </div>

                    <DrawerClose asChild />
                </DrawerContent>
            </Drawer>

            <Drawer open={cartOpen} onOpenChange={setCartOpen} direction="bottom">
                <DrawerContent className="bg-zinc-900 px-6 top-80 text-amber-50">
                    <DrawerHeader className="flex items-center gap-4">
                        <img
                            src={selectedMovie?.image || "src/assets/poster/Interstellar.jpg"}
                            alt="Poster"
                            className="w-[50px] h-[80px] object-cover shadow-md rounded"
                        />
                        <div>
                            <h1 className="text-2xl font-poppins pb-1">{selectedMovie?.title}</h1>

                            <div className="flex items-center gap-2">
                                <p className="text-md text-gray-500 font-poppins">{selectedMovie?.duration}</p>
                                <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                                <p className="text-md text-gray-500 font-poppins">{selectedMovie?.releaseDate}</p>
                            </div>
                        </div>
                    </DrawerHeader>

                    <div className="px-2">
                        <DrawerDescription className="text-xl font-poppins py-3">Seats</DrawerDescription>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Array.from(selectedSeats).map((seat) => (
                                <span
                                    key={seat}
                                    className="bg-blue-600 px-3 py-1 rounded-full text-white text-sm shadow"
                                >
                                    {seat}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between text-lg font-poppins mb-2">
                            <div className="font-semibold">
                                Total Price: {totalPrice.toLocaleString("vi-VN")}₫
                            </div>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded font-semibold"
                                onClick={handleProceed}
                            >
                                PROCEED
                            </button>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}
