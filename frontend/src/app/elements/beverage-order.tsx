import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { convertGoogleDriveUrl } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAllFoodDrinks } from "../api/api";

type FoodDrink = {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    isAvailable: boolean;
};

export const BeverageOrder = ({ onTotalChange }: { onTotalChange: (total: number) => void }) => {
    const [beverages, setBeverages] = useState<FoodDrink[]>([]);
    const [selectedBeverage, setSelectedBeverage] = useState<FoodDrink | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [orderItems, setOrderItems] = useState<{ item: FoodDrink; quantity: number }[]>([]);

    useEffect(() => {
        const fetchBeverages = async () => {
        try {
            const data = await fetchAllFoodDrinks();
            setBeverages(data);
            console.log("Fetched beverages:", data);
        } catch (error) {
            console.error("Error fetching beverages:", error);
        }
        };

        fetchBeverages();
    }, []);

    const handleAddToOrder = () => {
        alert(`Added ${quantity} x ${selectedBeverage?.name} to order.`);
        if (selectedBeverage) {
            setOrderItems((prev) => [...prev, { item: selectedBeverage, quantity }]);
            setIsDialogOpen(false);
        }
    };

    useEffect(() => {
        const total = orderItems.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);
        onTotalChange(total);
    }, [orderItems, onTotalChange]);

    return (
        <div className="beverage-order">
        <h2 className="text-2xl font-bold mb-4">Beverage Order</h2>
        <ul className="grid grid-cols-2 gap-4">
            {beverages.map((bev) => (
            <li
                key={bev._id}
                className="p-3 border-2 border-gray-700 rounded cursor-pointer hover:bg-gray-800"
                onClick={() => {
                setSelectedBeverage(bev);
                setQuantity(1);
                setIsDialogOpen(true);
                }}
            >
                <p className="font-semibold">{bev.name}</p>
                <img
                src={convertGoogleDriveUrl(bev.image)}
                alt={bev.name}
                className="w-full h-32 object-cover mb-2"
                />
                <p>{bev.description}</p>
                <p className="text-sm text-green-400">{bev.price.toLocaleString()}₫</p>
            </li>
            ))}
        </ul>

        {/* Dialog for Quantity Selection */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-zinc-900 text-white">
            <DialogHeader>
                <DialogTitle>{selectedBeverage?.name}</DialogTitle>
            </DialogHeader>

            {selectedBeverage && (
                <>
                <img
                    src={convertGoogleDriveUrl(selectedBeverage.image)}
                    alt={selectedBeverage.name}
                    className="w-full h-70 object-cover rounded"
                />
                <p className="text-md font-poppins">{selectedBeverage.description}</p>

                <div className="flex justify-between items-center border-2 rounded px-3 py-2 w-full bg-zinc-900">
                    <label className="text-md font-poppins">Quantity</label>

                    <div className="flex items-center gap-2">
                        <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="text-red-500 border-red-500 rounded-full p-1 border-2 hover:text-white transition"
                        >
                        <Minus className="w-4 h-4 text-white font-bold" />
                        </button>

                        <input
                        type="text"
                        readOnly
                        value={quantity}
                        className="w-15 m-2 p-1 text-center bg-zinc-800 text-white border border-gray-600 rounded"
                        />

                        <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="text-red-500 border-red-500 rounded-full p-1 border-2 hover:text-white transition"
                        >
                        <Plus className="w-4 h-4 text-white font-bold" />
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleAddToOrder}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white"
                >
                    Add {(selectedBeverage.price * quantity).toLocaleString("vi-VN")}₫ to Order
                </button>
                </>
            )}
            </DialogContent>
        </Dialog>
        <div className="text-xl font-semibold mt-2">Selected Beverage: {selectedBeverage?.name}</div>
        </div>
    );
};
