// Components
import AppSidebar from "@/app/components/app-sidebar";
import { PosterCarousel } from "@/app/components/poster-carousel";


// Icons

// ShadcnUI Components
import { SidebarProvider } from "./components/ui/sidebar";

import { Header } from "@/app/components/header";
import './App.css';

function App() {
  return (
    <div className="bg-jet-black min-h-screen text-white">
      <SidebarProvider>
        <AppSidebar />

        <div className="flex-1 flex flex-col">
            {/*Header */}
            <Header/>
          
            {/*Poster Carousel */}
            <PosterCarousel/>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default App;
