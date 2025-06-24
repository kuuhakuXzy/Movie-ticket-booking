import AppSidebar from "@/app/elements/app-sidebar";
import { Footer } from "@/app/elements/footer";
import Header from "@/app/elements/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { fetchUserBooking } from "../api/api";

export default function ReservationPage() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const id = user?.id;
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        // Fetch user bookings
        fetchUserBooking(id)
            .then((data) => {
                console.log("Fetched user bookings:", data);
                setBookings(data || []);
            })
            .catch(console.error);
    }, [id]);

    return (
        <div className="bg-jet-black min-h-screen text-white">
            <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <Header />

                    {/* Main Content */}
                    <div className="p-10">
                        <h1 className="text-2xl font-bold mb-4">Reservation Management</h1>
                        <p className="text-gray-400">Manage your reservations here.</p>
                    </div>

                    <div className="p-10">
                        <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
                        <ul>
                            {bookings.map((booking) => (
                                <li key={booking._id} className="border-b border-gray-700 py-4">
                                    <h3 className="font-bold">{booking.movie}</h3>
                                    <p className="text-gray-400">Showtime: {booking.showtime.startTime}</p>
                                    <p className="text-gray-400">Seats: {booking.seats.map((seat: { seatNumber: any; }) => seat.seatNumber).join(", ")}</p>
                                    <p className="text-gray-400">Total Amount: {booking.totalAmount} VND</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Footer */}
                    <Footer />
                </div>
            </SidebarProvider>
        </div>
    );
}