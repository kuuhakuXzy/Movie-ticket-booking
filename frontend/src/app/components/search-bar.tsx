import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="w-full px-16 py-4">
            <div className="flex items-center space-x-2 rounded-lg bg-light-grey px-3.5 py-1">
                <Search className="h-8 w-8 text-white" />
                <Input
                    type="search"
                    placeholder="Search movie and more..."
                    className="w-full h-10 text-white font-poppins text-xl bg-light-grey py-2 !border-none !outline-none !ring-0 !focus:ring-0"
                />
            </div>
        </div>
    );
}


