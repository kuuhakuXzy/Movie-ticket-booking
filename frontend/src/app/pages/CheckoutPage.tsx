import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Film } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../api/api";
import { BeverageOrder } from "../elements/beverage-order";

type FoodDrink = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
};

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

type BookingPayload = {
  showtimeId: string;
  seats: {
    seatNumber: string;
    price: number;
  }[];
  foodDrinks: {
    item: string;
    quantity: number;
    price: number;
  }[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: "cash" | "credit_card" | "momo" | "zalo";
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state: { showtime: Showtime; seats: string[]; seatLabels?: string[] };
  };

  const showtime = state?.showtime;
  const seats = state?.seats || [];

  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [beverageTotal, setBeverageTotal] = useState(0);
  const [beverageItems, setBeverageItems] = useState<
    { item: FoodDrink; quantity: number }[]
  >([]);
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "credit_card" | "momo" | "zalo"
  >("credit_card");

  const [loading, setLoading] = useState(false);

  if (!showtime || seats.length === 0) {
    return (
      <p className="text-center text-white mt-10">
        No showtime or seats selected.
      </p>
    );
  }

  const ticketTotal = showtime.price * seats.length;
  const grandTotal = ticketTotal + beverageTotal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.phone) {
      alert("Please fill in all your information.");
      return;
    }

    setLoading(true);

    try {
      const payload: BookingPayload = {
        showtimeId: showtime._id || "",
        seats: seats.map((label) => ({
          seatNumber: label,
          price: showtime.price,
        })),
        foodDrinks: beverageItems.map(({ item, quantity }) => ({
          item: item._id,
          quantity,
          price: item.price * quantity,
        })),
        customerInfo: user,
        paymentMethod,
      };

      console.log("Payload being sent to backend:", payload);
      const response = await createBooking(payload);

      alert("Booking successful!");
      navigate("/reservations", { state: { booking: response } });
    } catch (error) {
      alert("Booking failed. Please try again.");
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-6 py-10 text-white">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 mb-8">
        <Film className="h-10 w-10 text-red-600" />
        <div className="text-3xl font-alfa text-red-500">CineBook</div>
      </a>

      {/* Ticket Summary */}
      <div className="w-full max-w-xl bg-black shadow rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 font-poppins">Ticket Order</h2>

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
            {seats.map((seat, i) => (
              <span
                key={i}
                className="bg-blue-600 px-3 py-1 rounded-full text-sm shadow"
              >
                {seat}
              </span>
            ))}
          </div>
        </div>

        <div className="text-md font-semibold font-poppins">
          Ticket Total: {ticketTotal.toLocaleString("vi-VN")}₫
        </div>
      </div>

      {/* Beverage */}
      <div className="w-full max-w-xl bg-black shadow rounded-xl p-6 mb-8">
        <BeverageOrder
          onTotalChange={setBeverageTotal}
          onItemsChange={setBeverageItems}
        />
        <div className="text-md font-semibold font-poppins pt-2">
          Beverage Total: {beverageTotal.toLocaleString("vi-VN")}₫
        </div>
      </div>

      {/* User Info + Payment */}
      <form
        onSubmit={handleCheckout}
        className="w-full max-w-xl bg-black shadow space-y-6 p-8 rounded-xl"
      >
        <h2 className="text-3xl font-bold text-center font-poppins">
          Movie Checkout
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Your Information</h3>
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
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              required
              className="w-full border p-2 rounded bg-gray-800 text-white mt-4"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value as "cash" | "credit_card" | "momo" | "zalo"
                )
              }
              className="w-full border p-2 rounded bg-gray-800 text-white"
            >
              <option value="credit_card">Credit / Debit Card</option>
              <option value="momo">Momo E-Wallet</option>
              <option value="zalo">ZaloPay E-Wallet</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading
              ? "Processing..."
              : `Confirm Booking – ${grandTotal.toLocaleString("vi-VN")}₫`}
          </Button>
        </div>
      </form>
    </div>
  );
}
