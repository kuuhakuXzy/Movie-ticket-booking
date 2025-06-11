// Components
import AppSidebar from "@/app/components/app-sidebar";
import PosterCarousel from "@/app/components/poster-carousel";
import TabsPanel from "@/app/components/tab-panel";
// Icons

// ShadcnUI Components
import { SidebarProvider } from "@/components/ui/sidebar";

import { Header } from "@/app/components/header";
export default function HomePage() {
    return (
        <div className="bg-jet-black min-h-screen text-white">
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <div className="flex-1 flex flex-col">
                {/*Header */}
                <Header/>
            
                {/*Poster Carousel */}
                <PosterCarousel/>

                <TabsPanel/>
            </div>
        </SidebarProvider>
        </div>
    )
}