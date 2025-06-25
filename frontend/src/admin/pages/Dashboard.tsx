'use client';
import {
    Tabs,
    TabsList,
    TabsTrigger
} from '@/components/ui/tabs';

import { AddFoodDrink } from '../elements/AddFoodDrink';
import { AddMovie } from '../elements/AddMovie';
import { AddShowtime } from '../elements/AddShowtime';
import { UserDropdown } from '../elements/UserDropdown';

export default function DashboardPage() {
    return (
        <div className="relative max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">

            {/* Top-right user dropdown */}
            < UserDropdown />

                <Tabs defaultValue="overview" className="space-y-4">
                <div className="flex flex-col gap-2 md:flex-col md:items-center md:justify-start">
                    <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
                    <TabsList>
                        <TabsTrigger value="overview" className="mx-2 font-poppins text-lg">Overview</TabsTrigger>
                        <TabsTrigger value="analytics" className="font-poppins text-lg">Analytics</TabsTrigger>
                    </TabsList>
                </div>

                <AddMovie />
                <AddFoodDrink />
                <AddShowtime />

            </Tabs>
        </div>
    );
}
