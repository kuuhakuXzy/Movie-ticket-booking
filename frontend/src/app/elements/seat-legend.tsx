import { Armchair } from "lucide-react"

export default function SeatLegend() {
    return (
        <div className="flex justify-center space-x-10 mt-4 text-white font-semibold items-center">
            {/* Not Selected */}
            <div className="flex items-center space-x-2">
                <Armchair className="w-6 h-6 text-white" />
                <span className="font-poppins">Not Selected</span>
            </div>

            {/* Occupied */}
            <div className="flex items-center space-x-2">
                <Armchair className="w-6 h-6 text-red-600" />
                <span className="text-red-600 font-poppins">Occupied</span>
            </div>

            {/* Selected */}
            <div className="flex items-center space-x-2">
                <Armchair className="w-6 h-6 text-blue-600" />
                <span className="text-blue-600 font-poppins">Selected</span>
            </div>
        </div>
    )
}
