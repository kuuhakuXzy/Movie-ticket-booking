import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="flex items-center space-x-2 rounded-lg bg-gray-400 dark:bg-gray-900 px-3.5 py-2">
        <Search className="h-4 w-4 text-black" />
        <Input
            type="search"
            placeholder="Search"
            className="w-full h-8 text-gray-900 bg-gray-400 !border-none !outline-none !ring-0 !focus:ring-0 !focus:outline-none"
        />
        </div>
    );
}


