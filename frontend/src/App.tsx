import { AppSidebar } from "@/app/components/app-sidebar";
import SearchBar from "@/app/components/search-bar";
import { Film, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import './App.css';
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
  return (
    <div className="bg-jet-black min-h-screen text-white">
      <SidebarProvider>
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between shadow-md">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="bg-white text-black px-4 py-2 rounded" />

                <a href="#" className="flex items-center gap-2 font-medium">
                  <div className="flex items-center justify-center rounded-md bg-primary text-white">
                    <Film className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-semibold font-sans">CineBook</div>
                </a>
              </div>
              {/*Search Bar */}
              <div className="w-full px-4"><SearchBar/></div>
              {/*Login Button */}
              <div className="flex items-center gap-6">
              <Link
                to="/login"
                className="flex items-center rounded-lg py-2 px-4 bg-gray-800 hover:bg-gray-600 transition-colors duration-200 text-white font-bold text-sm"
              >
                <UserRound className="mr-2" />
                Login
              </Link>
            </div>
          </header>

        </div>
      </SidebarProvider>
    </div>
  );
}

export default App;
