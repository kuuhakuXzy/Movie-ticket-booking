import AppDrawer from "@/app/components/app-drawer";
import AppSidebar from "@/app/components/app-sidebar";
import Header from "@/app/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function BookingPage() {
    return (
        <div className="bg-jet-black min-h-screen text-white">
            <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                <div className="flex-1 flex-col">
                    {/*Header */}
                    <Header/>

                    <div className="relative w-full">
                        {/* Wallpaper Image (Background) */}
                        <img
                            src="src/assets/Interstellar-Wallpaper.jpg"
                            alt="Wallpaper"
                            className="w-full h-[400px] object-cover"
                        />

                        {/* Poster Image (Overlayed) */}
                        <img
                            src="src/assets/poster/Interstellar.jpg"
                            alt="Poster"
                            className="absolute bottom-0 left-0 w-[200px] h-[300px] scale-75 object-cover rounded shadow-lg"
                        />

                        {/* Text Overlay */}
                        <div className="absolute bottom-0 left-40 p-10 w-full h-full flex flex-col justify-end items-start">
                            <h1 className="text-4xl font-bold text-white">Interstellar</h1>
                            <p className="text-lg text-gray-300 mt-2">2014 • PG-13 • 2h 49m</p>
                            <p className="font-poppins text-md text-gray-400 mt-2">Genres: Adventure, Drama, Sci-Fi</p>
                            <p className="font-poppins text-md text-gray-400 mt-2">Release Date: November 7, 2014</p>
                            <p className="font-poppins text-md text-white mt-2">Description: A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.</p>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="flex flex-col px-10 py-8">
                        <div className="text-2xl text-white font-poppins mb-3">Times & Tickets</div>
                        <AppDrawer />
                    </div>
                </div>

                
            </SidebarProvider>
        </div>
    );
}