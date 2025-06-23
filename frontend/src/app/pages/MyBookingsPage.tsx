import { useEffect, useState } from 'react';
import { Header } from '@/app/elements/header';
import { Footer } from '@/app/elements/footer';
import AppSidebar from '@/app/elements/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getUserBookings } from '../api/api'; // Assuming you will create this function in api.ts
import { Link } from 'react-router-dom';

// You might want to move these type definitions to a separate types file
type Showtime = {
  _id: string;
  movie: {
    _id: string;
    title: string;
    image: string;
  };
  startTime: string;
  endTime: string;
};

type Seat = {
  seatNumber: string;
  price: number;
};

type FoodDrink = {
  item: {
    name: string;
    price: number;
  };
  quantity: number;
};

type Booking = {
  _id: string;
  bookingReference: string;
  showtime: Showtime;
  seats: Seat[];
  foodDrinks: FoodDrink[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingDate: string;
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ _id: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (!user) {
        setLoading(false);
        return;
    };

    const fetchBookings = async () => {
      try {
        const userBookings = await getUserBookings(user._id);
        setBookings(userBookings);
      } catch (err) {
        setError('Failed to fetch bookings. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <div className="bg-jet-black min-h-screen text-white flex">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8">
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
            {loading && <p>Loading your bookings...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!user && !loading && (
                <p>Please <Link to="/user/login" className="text-blue-500 hover:underline">log in</Link> to see your bookings.</p>
            )}
            {user && !loading && !error && bookings.length === 0 && (
              <p>You have no bookings yet. <Link to="/" className="text-blue-500 hover:underline">Book a movie!</Link></p>
            )}
            {user && !loading && !error && bookings.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <div key={booking._id} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl font-bold mb-2">{booking.showtime.movie.title}</h2>
                    <p className="text-sm text-gray-400 mb-4">Ref: {booking.bookingReference}</p>
                    <p><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs font-bold ${
                      booking.status === 'confirmed' ? 'bg-green-500' :
                      booking.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>{booking.status.toUpperCase()}</span></p>
                    <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    <p><strong>Showtime:</strong> {new Date(booking.showtime.startTime).toLocaleString()}</p>
                    <p><strong>Seats:</strong> {booking.seats.map(s => s.seatNumber).join(', ')}</p>
                    {booking.foodDrinks.length > 0 && (
                        <p><strong>Extras:</strong> {booking.foodDrinks.map(fd => `${fd.item.name} (x${fd.quantity})`).join(', ')}</p>
                    )}
                    <p className="text-right font-bold text-lg mt-4">Total: ${booking.totalAmount.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
} 