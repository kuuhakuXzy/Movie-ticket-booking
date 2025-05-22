import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { CirclePlus } from "lucide-react"

export default function AppDrawer() {
    return (
        <Drawer direction = 'right'>
        <DrawerTrigger asChild>
            <button className="rounded flex items-center gap-2 cursor-pointer">
                <div className="font-poppins text-red-600">Select Cinema</div>
                <CirclePlus className="h-4 w-4" />
            </button>
        </DrawerTrigger>

        <DrawerContent className="bg-zinc-900 border-0 text-white p-6">
            <DrawerHeader>
            <DrawerTitle>Interstellar</DrawerTitle>
                <DrawerDescription>Details about the movie</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                <p>Genre: Sci-fi</p>
                <p>Director: Christopher Nolan</p>
                <p>Year: 2014</p>
                </div>
            <DrawerClose asChild>
            </DrawerClose>
        </DrawerContent>
        </Drawer>
    )
}
