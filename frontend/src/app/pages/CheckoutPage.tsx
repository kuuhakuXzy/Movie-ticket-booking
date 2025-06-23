import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Film } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { BeverageOrder } from "../elements/beverage-order";

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

export default function CheckoutPage() {
  const { state } = useLocation() as {
    state: { showtime: Showtime; seats: string[] };
  };

  const showtime = state?.showtime;
  const seats = state?.seats || [];

  const [user, setUser] = useState({ name: "", email: "" });
  const [beverageTotal, setBeverageTotal] = useState(0);

  if (!showtime) {
    return <p className="text-center text-white mt-10">No showtime selected.</p>;
  }

  const ticketTotal = showtime.price * seats.length;
  const grandTotal = ticketTotal + beverageTotal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      `Tickets booked for ${user.name}.\nSeats: ${seats.join(", ")}\nMovie: ${showtime.movie.title}\n` +
      `Tickets: ${ticketTotal.toLocaleString("vi-VN")}₫\n` +
      `Beverages: ${beverageTotal.toLocaleString("vi-VN")}₫\n` +
      `Grand Total: ${grandTotal.toLocaleString("vi-VN")}₫`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-6 py-10 text-white">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 mb-8">
        <Film className="h-10 w-10 text-red-600" />
        <div className="text-3xl font-alfa text-red-500">CineBook</div>
      </a>

      {/* Checkout Summary */}
      <div className="w-full max-w-xl bg-black shadow rounded-xl p-6 mb-8">
        <h1 className="text-3xl font-bold mb-6 font-poppins">Checkout Summary</h1>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={showtime.movie.image}
            alt={showtime.movie.title}
            className="w-[50px] h-[80px] object-cover shadow-md rounded"
          />
          <div>
            <h2 className="text-2xl font-poppins">{showtime.movie.title}</h2>
            <div className="flex items-center gap-2 text-gray-400">
              <p>{showtime.movie.duration}</p>
              <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
              <p>{new Date(showtime.movie.releaseDate).toDateString()}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Selected Seats:</h3>
          <div className="flex flex-wrap gap-2">
            {seats.length > 0 ? (
              seats.map((seat, i) => (
                <span key={i} className="bg-blue-600 px-3 py-1 rounded-full text-sm shadow">
                  {seat}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No seats selected</p>
            )}
          </div>
        </div>

        <div className="text-md font-semibold font-poppins">Ticket Total: {ticketTotal.toLocaleString("vi-VN")}₫</div>
        
      </div>

      <div className="w-full max-w-xl bg-black shadow rounded-xl p-6 mb-8">
        <BeverageOrder onTotalChange={setBeverageTotal} />
        <div className="text-md font-semibold font-poppins pt-2">Beverage Total: {beverageTotal.toLocaleString("vi-VN")}₫</div>
      </div>

      {/* User Info Form */}
      <form
        onSubmit={handleCheckout}
        className="w-full max-w-xl bg-black shadow space-y-6 p-8 rounded-xl"
      >
        <h2 className="text-3xl font-bold text-center">Movie Checkout</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">Your Information</h3>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
              className="w-full border p-2 rounded bg-gray-800 text-white"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              className="w-full border p-2 rounded bg-gray-800 text-white mt-4"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
            <select className="w-full border p-2 rounded bg-gray-800 text-white">
              <option value="card">Credit / Debit Card</option>
              <option value="ewallet">E-Wallet (e.g. Momo, ZaloPay)</option>
            </select>
          </div>

          <Button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Confirm Booking – {grandTotal.toLocaleString("vi-VN")}₫
          </Button>
        </div>
      </form>
    </div>
  );
}
