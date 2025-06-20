export function Calendar () {
    return (
        <div>
                <div className="text-lg font-medium mb-2 font-poppins">Select a Date</div>
                <div className="flex gap-4 overflow-x-auto">
                    {Array.from({ length: 7 }).map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() + i);
                        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
                        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                return (
                    <button
                        key={i}
                        className="flex flex-col items-center px-4 py-2 border rounded-lg hover:bg-blue-100"
                    >
                        <span className="text-sm font-semibold">{day}</span>
                        <span className="text-xs text-gray-500">{monthDay}</span>
                    </button>
                    );
                })}
                </div>
        </div>
    )
}