import SearchBar from "@/app/components/search-bar";
import { Film, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import './App.css';

function App() {
  
  return (
    <>
      <div className="bg-jet-black flex items-center justify-center">
        <div className="flex justify-center mr-12">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-white">
              <Film className="size-20" />
            </div>
            <div className="text-white text-2xl font-semibold font-sans">CineBook</div>
          </a>
        </div>
        <SearchBar/>
        {/* Log in Button */}
        <Link
          to="/login"
          className="flex items-center rounded-lg py-2 px-3 ml-10 bg-black hover:bg-gray-600 transition-colors duration-200 text-white font-bold text-sm"
        >
          <UserRound className="text-white mr-2" />
          Login
        </Link>
        </div>
    </>
  );
}

export default App;
