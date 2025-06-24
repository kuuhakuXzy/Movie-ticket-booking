import { SidebarTrigger } from "@/components/ui/sidebar";
import { Film } from "lucide-react";
import LoginButton from "./login-button";
import SearchBar from "./search-bar";
import { Link } from "react-router-dom";

export const Header = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const id = user?.id;
    return (
        <header className="flex items-center justify-between bg-jet-black pt-5">
            <SidebarTrigger className="bg-gray-500 text-black mx-5 px-2 py-2 rounded" />
            {/*CineBook Logo*/}
            <Link to={`/${id}`} className="flex items-center gap-2">
                {/*Film Icon*/}
                <Film className="ml-6 h-10 w-10 text-red-600" />
                <div className="text-3xl pt-1 font-alfa text-red-500">CineBook</div>
            </Link>
            {/*Search Bar */}
            <SearchBar/>
            {/*Login Button */}
            <LoginButton/>
        </header>
    )
}

export default Header