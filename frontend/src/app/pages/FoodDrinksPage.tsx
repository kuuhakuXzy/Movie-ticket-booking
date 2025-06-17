import { useEffect, useState } from 'react';
import axios from 'axios';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/app/elements/app-sidebar';
import { Film } from 'lucide-react';
import { convertGoogleDriveUrl } from '@/lib/utils';

interface FoodItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function FoodDrinksPage() {
  const [foodData, setFoodData] = useState<FoodItem[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/food-drink')
      .then(res => {
        setFoodData(res.data.foodDrinks || []);
        })
      .catch(err => {
        console.error('Error fetching food data:', err);
      });
  }, []);

  return (
    <div className="bg-jet-black min-h-screen text-white flex">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <div className="flex-1 flex flex-col p-6">
          <a href="/" className="flex items-center gap-2 mb-8">
            <Film className="h-10 w-10 text-red-600" />
            <div className="text-3xl font-alfa text-red-500">CineBook</div>
          </a>
          <h1 className="text-3xl font-bold mb-6">Food & Drinks</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodData.map((item: FoodItem) => (
              <div
                key={item._id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={convertGoogleDriveUrl(item.image)} // Adjust if your backend serves images differently
                  alt={item.name}
                  className="w-[500px] h-[300px] object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-400">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(item.price)}
                  </p>
                  <p className="text-sm mt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
