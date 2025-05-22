import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-separator";
import { HeartIcon, TicketIcon } from "lucide-react";

const posterItem = [
    {
        id: 1,
        title: "Dune",
        image: "src/assets/poster/Dune.jpg",
        rating: "13+",
        duration: "155 minutes",
        releaseDate: "10 February 2021",
        genres: "Science Fiction, Epic, Adventure",
        description: "Dune follows the emotional, epic journey of Paul Atreides, a gifted young man destined for greatness. He travels to the universe’s most dangerous planet to protect his family and people. As ruthless forces battle for control over a powerful resource that unlocks human potential, only those who conquer their fear will survive."
    },
    {
        id: 2,
        title: "Interstellar",
        image: "src/assets/poster/Interstellar.jpg",
        rating: "13+",
        duration: "169 minutes",
        releaseDate: "28 February 2025",
        genres: "Science Fiction, Drama, Adventure",
        description: "Interstellar follows a team of explorers who travel through a wormhole in space in an attempt to ensure humanity's survival. The film explores themes of love, sacrifice, and the nature of time and space."
    },

]

export default function TabsPanel() {
    return (
        <Tabs defaultValue ="nowshowing" className="w-full">
            <TabsList className="flex justify-start gap-4">
                <TabsTrigger value="nowshowing" className="font-poppins text-2xl cursor-pointer">
                Now Showing
                </TabsTrigger>
                <TabsTrigger value="comingsoon" className="font-poppins text-2xl cursor-pointer">
                Coming Soon
                </TabsTrigger>
            </TabsList>
            <TabsContent value="nowshowing" className="ml-8">
                {posterItem.map((item, index) => (
                    <>
                        <div key={index} className="flex items-center gap-4 mb-10">
                                <img
                                    src={item.image}
                                    alt={`${item.title} Poster`}
                                    className="w-32 h-48 rounded-lg object-cover cursor-pointer"
                                />
                            <div>
                                <a href="/" className="group">
                                    <h1 className="text-2xl font-poppins pb-3 group-hover:underline">
                                        {item.title}
                                    </h1>
                                </a>
                                    <div className="flex items-center gap-2 font-poppins font-semibold">
                                        <p className="text-sm text-gray-500">{item.rating}</p>
                                        <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                                        <p className="text-sm text-gray-500">{item.duration}</p>
                                        <Separator orientation="vertical" className="h-4 w-px bg-gray-500" />
                                        <p className="text-sm text-gray-500">{item.releaseDate}</p>
                                    </div>
                                <h6 className="font-poppins text-md pt-2 text-gray-200">Genres: {item.genres}</h6>
                                    <p className="font-poppins text-sm pt-2 text-white-grey">{item.description}</p>
                                    <div className="flex items-center gap-2 pt-4">
                                        <button className="flex items-center bg-primary text-white px-4 py-2 rounded-md border-1 font-poppins hover:bg-gray-500 hover:text-jet-black shadow-md cursor-pointer">
                                            <TicketIcon className="w-4 h-4 mr-2" />
                                            Book Now
                                        </button>
                                        <button className="flex items-center bg-white-grey   text-black px-4 py-2 rounded-md font-poppins hover:text-white hover:bg-jet-black shadow-md cursor-pointer">
                                            <HeartIcon className="w-4 h-4 mr-2 text-red-600" />
                                            Watchlist
                                        </button>
                                    </div>
                            </div>
                        </div>
                    </>
                ))}
            </TabsContent>
            <TabsContent value="comingsoon">
                Change your password here.
            </TabsContent>
        </Tabs>
    );
}

