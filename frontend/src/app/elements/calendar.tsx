import { Drawer } from "@/components/ui/drawer"; // ensure this matches your drawer import
import { useState } from "react";
import SeatDrawer from "./seat-drawer";

export function Calendar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date.toISOString());
        setDrawerOpen(true);
    };

    return (
        <>
        <div className="flex gap-4 m-4 overflow-x-auto">
            {Array.from({ length: 7 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const day = date.toLocaleDateString("en-US", { weekday: "short" });
            const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

            return (
                <button
                key={i}
                onClick={() => handleDateClick(date)}
                className="flex flex-col items-center px-4 py-2 border rounded-lg hover:bg-blue-100"
                >
                <span className="text-sm font-semibold">{day}</span>
                <span className="text-xs text-gray-500">{monthDay}</span>
                </button>
            );
            })}
        </div>

        {/* Drawer controlled by state */}
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
                <SeatDrawer selectedDate={selectedDate ?? ""} onClose={() => setDrawerOpen(false)} />
            </Drawer>
        </>
    );
}
