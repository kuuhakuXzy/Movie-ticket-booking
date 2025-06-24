import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { convertGoogleDriveUrl } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { Armchair, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SeatLegend from "./seat-legend";

type Showtime = {
  _id?: string;
  movie: {
    _id: string;
    title: string;
    image: string;
    duration: string;
    releaseDate: string;
  };
  cinema: string;
  hall: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
};

type SeatDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  showtime: Showtime | null;
};

export default function SeatDrawer({ isOpen, onClose, showtime }: SeatDrawerProps) {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setSelectedSeats(new Set());
  }, [showtime]);

  if (!showtime) return null;

  const seatPrice = showtime.price;
  const totalPrice = seatPrice * selectedSeats.size;

  const toggleSeat = (row: number, col: number) => {
    const seatId = `${row + 1}${"ABCDEFGHIJ"[col]}`;
    setSelectedSeats((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(seatId)) newSet.delete(seatId);
      else newSet.add(seatId);
      return newSet;
    });
  };

  const handleProceed = () => {
    if (selectedSeats.size === 0) {
      alert("Please select at least one seat.");
      return;
    }

    navigate(`/checkout/${showtime._id}`, {
      state: { showtime,
        seats: Array.from(selectedSeats),
      },
    });
  };

  return (
    <>
      {/* Main seat drawer */}
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="bg-zinc-900 border-0 text-white">
          <DrawerHeader className="ml-2">
            <div className="flex justify-between items-center">
              <div>
                <DrawerTitle className="font-poppins pb-2">
                  {showtime.movie.title}
                </DrawerTitle>
                <DrawerTitle className="text-sm text-gray-400">
                  {new Date(showtime.date).toDateString()}
                </DrawerTitle>
              </div>
              <DrawerClose asChild>
                <button onClick={onClose}>
                  <X className="w-5 h-5" />
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex justify-center px-2 pb-28">
            <div>
              {/* Screen label */}
              <div className="w-full h-6 bg-gray-700 rounded-md text-center font-semibold mb-2">
                SCREEN
              </div>

              {/* Column headers */}
              <div className="flex items-center gap-2 ml-2 mb-1">
                <div className="w-6" />
                {Array.from("ABCDEFGHIJ").map((letter, colIndex) => (
                  <div key={colIndex} className="flex items-center">
                    <div className="w-6 h-6 text-center text-sm font-bold select-none">
                      {letter}
                    </div>
                    {colIndex === 4 && <div className="w-10" />} {/* Aisle */}
                  </div>
                ))}
              </div>

              {/* Seat grid */}
              <div className="flex flex-col gap-2">
                {Array.from({ length: 10 }).map((_, rowIndex) => (
                  <div key={rowIndex} className="flex items-center gap-2 ml-2">
                    <div className="w-6 text-center text-sm font-bold">
                      {rowIndex + 1}
                    </div>
                    {Array.from({ length: 10 }).map((_, colIndex) => {
                      const seatId = `${rowIndex + 1}${"ABCDEFGHIJ"[colIndex]}`;
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

              {/* View Cart */}
              {selectedSeats.size > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 px-4 py-3 border-t border-gray-700 z-50">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setCartOpen(true)}
                      className="border border-white text-white px-4 py-2 rounded flex flex-col items-start hover:bg-white hover:text-black transition"
                    >
                      <span className="text-sm font-bold">View Cart</span>
                      <span className="text-xs">
                        {selectedSeats.size} seat
                        {selectedSeats.size > 1 ? "s" : ""} selected
                      </span>
                    </button>
                  </div>
                </div>
              )}

              <SeatLegend />
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Cart bottom drawer */}
      <Drawer open={cartOpen} onOpenChange={setCartOpen} direction="bottom">
        <DrawerContent className="bg-zinc-900 px-6 top-80 text-amber-50">
          <DrawerHeader className="flex items-center gap-4">
            <img
              src={convertGoogleDriveUrl(showtime.movie.image)}
              alt="Poster"
              className="w-[50px] h-[80px] object-cover shadow-md rounded"
            />
            <div>
              <h1 className="text-2xl font-poppins pb-1">
                {showtime.movie.title}
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-md text-gray-500 font-poppins">
                  {showtime.movie.duration}
                </p>
                <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                <p className="text-md text-gray-500 font-poppins">
                  {new Date(showtime.movie.releaseDate).toDateString()}
                </p>
              </div>
            </div>
          </DrawerHeader>

          <div className="px-2">
            <DrawerDescription className="text-xl font-poppins py-3">
              Seats
            </DrawerDescription>
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
