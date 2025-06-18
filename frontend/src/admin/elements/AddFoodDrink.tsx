import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from '@/components/ui/tabs';
import { Popcorn } from 'lucide-react';
import { useState } from 'react';
import { createFoodDrink } from "../api/api";

export function AddFoodDrink() {
    type FoodDrink = {
        _id?: string,
        name: string;
        description: string;
        price: string;
        category: 'Food' | 'Drink' | 'Combo';
        image: string;
        isAvailable: boolean;
    };

    const [showAddForm, setShowAddForm] = useState(false);
    const [foodDrink, setfoodDrink] = useState<FoodDrink[]>([]);
    const [newItem, setNewItem] = useState<FoodDrink>({
        name: '',
        description: '',
        price: '',
        category: 'Food',
        image: '',
        isAvailable: true
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        let newValue: string | boolean = value;
        if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
            newValue = e.target.checked;
        }
        setNewItem(prev => ({ ...prev, [name]: newValue }));
    };

    const handleAddFoodDrink = async () => {
        const payload = {
            ...newItem,
            category: newItem.category as 'Food' | 'Drink' | 'Combo',
        };

        try {
            const createdFoodDrink = await createFoodDrink(payload);
            setfoodDrink(prev => [...prev, createdFoodDrink]);
            setNewItem({
                name: '',
                description: '',
                price: '',
                category: 'Food',
                image: '',
                isAvailable: true
            });
            setShowAddForm(false);
            alert("Item added successfully!");
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <TabsContent value="overview" className="space-y-4">
            <Card
                onClick={() => setShowAddForm(!showAddForm)}
                className="cursor-pointer hover:shadow-md transition-shadow duration-300"
            >
                <CardHeader>
                    <CardTitle className="text-lg font-medium font-poppins">
                        Add New Food/Drink
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Popcorn />
                </CardContent>
            </Card>

            {showAddForm && (
                <Card className="mt-6 max-w-xl mx-auto">
                    <CardHeader>
                        <CardTitle>Add Food or Drink</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <input
                            className="w-full border p-2 text-sm"
                            name="name"
                            value={newItem.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                        <textarea
                            className="w-full border p-2 text-sm"
                            name="description"
                            value={newItem.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />
                        <input
                            className="w-full border p-2 text-sm"
                            name="price"
                            type="number"
                            value={newItem.price}
                            onChange={handleChange}
                            placeholder="Price"
                        />
                        <select
                            className="w-full border p-2 text-sm"
                            name="category"
                            value={newItem.category}
                            onChange={handleChange}
                        >
                            <option value="Food">Food</option>
                            <option value="Drink">Drink</option>
                            <option value="Combo">Combo</option>
                        </select>

                        <input
                            className="w-full border p-2 text-sm"
                            name="image"
                            type="text"
                            value={newItem.image}
                            onChange={handleChange}
                            placeholder="Google Drive Image URL"
                        />

                        {newItem.image && (
                            <img
                                src={newItem.image}
                                alt="Preview"
                                className="w-32 h-auto rounded border"
                            />
                        )}

                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                name="isAvailable"
                                checked={newItem.isAvailable}
                                onChange={handleChange}
                            />
                            Available
                        </label>

                        <button
                            onClick={handleAddFoodDrink}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        >
                            Submit
                        </button>
                    </CardContent>
                </Card>
            )}

            {foodDrink.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {foodDrink.map((fd, index) => (
                        <Card key={fd._id || index}>
                            <CardHeader>
                                <CardTitle className="text-base font-semibold">{fd.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <img
                                    src={fd.image}
                                    alt="Food/Drink"
                                    className="w-full h-48 object-cover rounded"
                                />
                                <p className="text-sm">{fd.description}</p>
                                <p className="text-sm font-medium text-blue-600">${fd.price}</p>
                                <p className="text-xs text-muted-foreground">Category: {fd.category}</p>
                                <p className="text-xs text-muted-foreground">
                                    Status: {fd.isAvailable ? 'Available' : 'Not Available'}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </TabsContent>
    );
}
