import { SidebarTrigger } from "@/components/ui/sidebar";
import { Film, HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./login-button";
import SearchBar from "./search-bar";

export const Header = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const id = user?.id ?? "guest";

    const [watchlist, setWatchlist] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("watchlist");
        if (stored) {
            setWatchlist(JSON.parse(stored));
        }

        const handleUpdate = () => {
            const updated = localStorage.getItem("watchlist");
            setWatchlist(updated ? JSON.parse(updated) : []);
        };

        window.addEventListener("watchlist-updated", handleUpdate);
        return () => window.removeEventListener("watchlist-updated", handleUpdate);
    }, []);

    return (
        <header className="flex items-center justify-between bg-jet-black pt-5 px-4">
            {/* Sidebar button */}
            <SidebarTrigger className="bg-gray-500 text-black px-2 py-2 rounded" />

            {/* CineBook Logo Link */}
            <Link to={`/${id}`} className="flex items-center ml-5 gap-2">
                <Film className="h-10 w-10 text-red-600" />
                <div className="text-3xl pt-1 font-alfa text-red-500">CineBook</div>
            </Link>

            {/* Search Bar */}
            <SearchBar />

            {/* Heart Icon with Link to Watchlist */}
            <div className="relative w-fit mr-5">
                <HeartIcon className="w-8 h-8 text-red-600" />
                {watchlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 font-poppins">
                        {watchlist.length}
                    </span>
                )}
            </div>

            {/* Login Button (already handles its own logic) */}
            <LoginButton />
        </header>
    );
};

export default Header;
