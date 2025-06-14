// elements
import AppSidebar from "@/app/elements/app-sidebar";
import PosterCarousel from "@/app/elements/poster-carousel";
import TabsPanel from "@/app/elements/tab-panel";
// Icons

// ShadcnUI elements
import { SidebarProvider } from "@/components/ui/sidebar";

import { Footer } from "@/app/elements/footer";
import { Header } from "@/app/elements/header";
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

                <Footer/>
            </div>
        </SidebarProvider>
        </div>
    )
}