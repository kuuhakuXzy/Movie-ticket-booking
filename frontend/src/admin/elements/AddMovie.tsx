'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { convertGoogleDriveUrl } from '@/lib/utils';
import { Clapperboard } from 'lucide-react';
import { useState } from 'react';
import { createMovie } from '../api/api';

type Movie = {
    _id: string;
    title: string;
    image: string;
    wallpaper: string;
    rating: string;
    duration: string;
    releaseDate: string;
    genres: string[];
    description: string;
    nowShowing: boolean;
};

export function AddMovie() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [newMovie, setNewMovie] = useState({
        _id: '',
        title: '',
        description: '',
        releaseDate: '',
        image: '',
        wallpaper: '',
        rating: '',
        duration: '',
        genres: '',
        nowShowing: false
    });

    const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
    const target = event.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setNewMovie((prev) => ({
        ...prev,
        [name]:
            type === 'checkbox'
            ? checked
            : name === '_id'
            ? value
            : value
    }));
    };

    const handleAddMovie = async () => {
    const payload = {
        ...newMovie,
        genres: newMovie.genres.split(',').map(g => g.trim()),
        image: newMovie.image,
        wallpaper: newMovie.wallpaper
    };

    try {
        const movie = await createMovie(payload);
        setMovies((prev) => [...prev, movie]);
        setNewMovie({
            _id: '',
            title: '',
            description: '',
            releaseDate: '',
            image: '',
            wallpaper: '',
            rating: '',
            duration: '',
            genres: '',
            nowShowing: false
            });
        setShowAddForm(false);
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
            <CardTitle className="text-lg font-medium font-poppins">Add New Movie</CardTitle>
            </CardHeader>
            <CardContent><Clapperboard /></CardContent>
        </Card>

        {showAddForm && (
            <Card className="mt-6 max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>Add Movie</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
                <input className="w-full border p-2 text-sm" name="title" value={newMovie.title} onChange={handleInputChange} placeholder="Title" />
                <textarea className="w-full border p-2 text-sm" name="description" value={newMovie.description} onChange={handleInputChange} placeholder="Description" />
                <input className="w-full border p-2 text-sm" name="releaseDate" type="date" value={newMovie.releaseDate} onChange={handleInputChange} />

                <input className="w-full border p-2 text-sm" name="image" value={newMovie.image} onChange={handleInputChange} placeholder="Google Drive Image URL" />
                <input className="w-full border p-2 text-sm" name="wallpaper" value={newMovie.wallpaper} onChange={handleInputChange} placeholder="Google Drive Wallpaper URL" />

                <input className="w-full border p-2 text-sm" name="rating" value={newMovie.rating} onChange={handleInputChange} placeholder="Rating" />
                <input className="w-full border p-2 text-sm" name="duration" value={newMovie.duration} onChange={handleInputChange} placeholder="Duration (e.g. 120 minutes)" />
                <input className="w-full border p-2 text-sm" name="genres" value={newMovie.genres} onChange={handleInputChange} placeholder="Genres (comma-separated)" />

                <label className="flex gap-2 items-center text-sm">
                <input type="checkbox" name="nowShowing" checked={newMovie.nowShowing} onChange={handleInputChange} />
                Now Showing
                </label>

                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={handleAddMovie}>Submit</button>
            </CardContent>
            </Card>
        )}

        {movies.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {movies.map((movie) => (
                <Card key={movie._id}>
                <CardHeader>
                    <CardTitle className="text-base font-semibold">{movie.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <img src={convertGoogleDriveUrl(movie.image)} alt="Movie Poster" className="w-full h-48 object-cover rounded" />
                    <p className="text-xs text-muted-foreground">ID: {movie._id}</p>
                    <p className="text-xs text-muted-foreground">{new Date(movie.releaseDate).toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">{movie.description}</p>
                    <p className="text-xs text-muted-foreground">Genres: {movie.genres.join(', ')}</p>
                    <p className="text-xs text-muted-foreground">Rating: {movie.rating}</p>
                    <p className="text-xs text-muted-foreground">Duration: {movie.duration}</p>
                </CardContent>
                </Card>
            ))}
            </div>
        )}
    </TabsContent>
    );
}
