'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Clapperboard } from 'lucide-react';
import { useState } from 'react';
import { createShowtime } from '../api/api';

export function AddShowtime() {
    type Showtime = {
        _id?: string;
        movieId: string;
        cinema: string;
        hall: "Hall 1" | "Hall 2" | "Hall 3";
        date: string;         // format: YYYY-MM-DD
        startTime: string;    // format: HH:mm
        endTime: string;      // format: HH:mm
        price: number;
    };

    const [showAddForm, setShowAddForm] = useState(false);
    const [showtimes, setShowtimes] = useState<Showtime[]>([]);
    const [newShowtime, setNewShowtime] = useState<Showtime>({
        movieId: '',
        cinema: '',
        hall: 'Hall 1',
        date: '',
        startTime: '',
        endTime: '',
        price: 100000
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setNewShowtime((prev) => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value
        }));
    };

    const handleAddShowtime = async () => {
        try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('You must be logged in to add a showtime');
        }
        
        const createdShowtime = await createShowtime(newShowtime, token);
        console.log('Created Showtime:', createdShowtime);
        setShowtimes((prev) => [...prev, createdShowtime]);
        setNewShowtime({
            movieId: '',
            cinema: '',
            hall: 'Hall 1',
            date: '',
            startTime: '',
            endTime: '',
            price: 100000
        });
        setShowAddForm(false);
        alert('Showtime added successfully!');
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
            <CardTitle className="text-lg font-medium font-poppins">Add New Showtime</CardTitle>
            </CardHeader>
            <CardContent><Clapperboard /></CardContent>
        </Card>

        {showAddForm && (
            <Card className="mt-6 max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>Add Showtime</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <input className="w-full border p-2 text-sm" name="movieId" value={newShowtime.movieId} onChange={handleInputChange} placeholder="Movie ID" />
                <input className="w-full border p-2 text-sm" name="cinema" value={newShowtime.cinema} onChange={handleInputChange} placeholder="Cinema Name" />
                <input className="w-full border p-2 text-sm" name="hall" value={newShowtime.hall} onChange={handleInputChange} placeholder="Hall Number" />
                <input className="w-full border p-2 text-sm" name="date" type="date" value={newShowtime.date} onChange={handleInputChange} />
                <input className="w-full border p-2 text-sm" name="startTime" type="time" value={newShowtime.startTime} onChange={handleInputChange} />
                <input className="w-full border p-2 text-sm" name="endTime" type="time" value={newShowtime.endTime} onChange={handleInputChange} />
                <input className="w-full border p-2 text-sm" name="price" type="number" value={newShowtime.price} onChange={handleInputChange} placeholder="Ticket Price" />

                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={handleAddShowtime}>Submit</button>
            </CardContent>
            </Card>
        )}

        {showtimes.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {showtimes.map((showtime) => (
                    <Card key={showtime._id}>
                    <CardHeader>
                        <CardTitle className="font-semibold text-xs">Movie ID: {showtime._id}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-xs text-muted-foreground">
                        <p>Cinema: {showtime.cinema}</p>
                        <p>Hall: {showtime.hall}</p>
                        <p>Date: {new Date(showtime.date).toLocaleDateString()}</p>
                        <p>Start: {showtime.startTime}</p>
                        <p>End: {showtime.endTime}</p>
                        <p>Price: {showtime.price}</p>
                    </CardContent>
                    </Card>
                ))}
                </div>
            )}
        </TabsContent>
    );
}
