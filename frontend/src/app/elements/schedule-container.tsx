import { Calendar } from "./calendar";
import SeatDrawer from "./seat-drawer";

type Props = {
    selectedCinemas: string[];
};

export default function SchedulerContainer({ selectedCinemas }: Props) {
    return (
        <div className="w-full rounded-lg border-amber-50 border-2 shadow-lg p-4">
            <Calendar/>
            {selectedCinemas.map((cinema) => (
                <div key={cinema} className="mb-4">
                    <h4 className="font-semibold">{cinema}</h4>
                    <SeatDrawer/>
                </div>
            ))}
        </div>
    )
}