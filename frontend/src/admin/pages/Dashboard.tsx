'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@/components/ui/tabs';
import { Clapperboard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMovie } from '../api/api';

export default function DashboardPage() {
    type Movie = {
        _id: string;
        id: number;
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

    const [showAddForm, setShowAddForm] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loggedInEmail, setLoggedInEmail] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) setLoggedInEmail(email);
    }, []);

    const [newMovie, setNewMovie] = useState<{
        id: number;
        title: string;
        description: string;
        releaseDate: string;
        image: File | string;
        wallpaper: File | string;
        rating: string;
        duration: string;
        genres: string;
        nowShowing: boolean;
    }>({
        id: 0,
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = event.target as HTMLInputElement;
        const { name, value, type, checked } = target;
        setNewMovie((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAddMovie = async () => {
    const formData = new FormData();
    formData.append('id', newMovie.id.toString());
    formData.append('title', newMovie.title);
    formData.append('description', newMovie.description);
    formData.append('releaseDate', newMovie.releaseDate);
    formData.append('rating', newMovie.rating);
    formData.append('duration', newMovie.duration);
    formData.append('nowShowing', newMovie.nowShowing.toString());
    formData.append('genres', newMovie.genres);

        if (newMovie.image instanceof File) {
            formData.append('image', newMovie.image);
        }

        if (newMovie.wallpaper instanceof File) {
            formData.append('wallpaper', newMovie.wallpaper);
        }

        try {
            const movie = await createMovie(formData);
            setMovies((prev) => [...prev, movie]);
            setNewMovie({
                id: 0,
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


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/login/admin');
    };

    return (
        <div className="relative max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">

            {/* Top-right user dropdown */}
            {loggedInEmail && (
                <div className="absolute top-4 right-6 z-50">
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu((prev) => !prev)}
                            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded shadow hover:bg-gray-200"
                        >
                            {loggedInEmail}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
                                <ul className="text-sm">
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => alert('Go to settings')}
                                    >
                                        Settings
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <Tabs defaultValue="overview" className="space-y-4">
                <div className="flex flex-col gap-2 md:flex-col md:items-center md:justify-start">
                    <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
                    <TabsList>
                        <TabsTrigger value="overview" className="mx-2 font-poppins text-lg">Overview</TabsTrigger>
                        <TabsTrigger value="analytics" className="font-poppins text-lg">Analytics</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="overview" className="space-y-4">
                    {/* Add Movie Card */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card onClick={() => setShowAddForm(!showAddForm)} className="cursor-pointer hover:shadow-md transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="text-lg font-medium font-poppins">Add New Movie</CardTitle>
                            </CardHeader>
                            <CardContent><Clapperboard /></CardContent>
                        </Card>
                    </div>

                    {/* Add Movie Form */}
                    {showAddForm && (
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>Add Movie</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <input
                                    className="w-full border p-2 text-sm"
                                    name="id"
                                    value={newMovie.id}
                                    onChange={handleInputChange}
                                    placeholder="ID (number)"
                                    />

                                    <input
                                    className="w-full border p-2 text-sm"
                                    name="title"
                                    value={newMovie.title}
                                    onChange={handleInputChange}
                                    placeholder="Title"
                                    />

                                    <textarea
                                    className="w-full border p-2 text-sm"
                                    name="description"
                                    value={newMovie.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"
                                    />

                                    <input
                                    className="w-full border p-2 text-sm"
                                    name="releaseDate"
                                    type="date"
                                    value={newMovie.releaseDate}
                                    onChange={handleInputChange}
                                    />

                                    <input
                                        id="imageUpload"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }} // Hide the input
                                        onChange={(e) =>
                                            setNewMovie((prev) => ({
                                            ...prev,
                                            image: e.target.files?.[0] || '',
                                            }))
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="bg-gray-200 px-3 py-1 text-sm rounded hover:bg-gray-300"
                                        onClick={() => document.getElementById('imageUpload')?.click()}
                                        >
                                        Upload Image
                                    </button>

                                    {/* Optional: Show selected file name */}
                                        {newMovie.image && typeof newMovie.image === 'object' && (
                                        <p className="text-xs mt-1 text-gray-500">Selected: {newMovie.image.name}</p>
                                    )}

                                    <input
                                        id="wallpaperUpload"
                                        name="wallpaper"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }} // Hide the input
                                        onChange={(e) =>
                                            setNewMovie((prev) => ({
                                            ...prev,
                                            wallpaper: e.target.files?.[0] || '',
                                            }))
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="bg-gray-200 px-3 py-1 text-sm rounded hover:bg-gray-300"
                                        onClick={() => document.getElementById('wallpaperUpload')?.click()}
                                        >
                                        Upload Wallpaper
                                    </button>

                                    {/* Optional: Show selected file name */}
                                        {newMovie.wallpaper&& typeof newMovie.wallpaper === 'object' && (
                                        <p className="text-xs mt-1 text-gray-500">Selected: {newMovie.wallpaper.name}</p>
                                    )}

                                    <input
                                    className="w-full border p-2 text-sm"
                                    name="rating"
                                    value={newMovie.rating}
                                    onChange={handleInputChange}
                                    placeholder="Rating"
                                    />

                                    <input
                                    className="w-full border p-2 text-sm"
                                    name="duration"
                                    value={newMovie.duration}
                                    onChange={handleInputChange}
                                    placeholder="Duration (e.g. 120 minutes)"
                                    />

                                    <input
                                    className="w-full border p-2 text-sm"
                                    name="genres"
                                    value={newMovie.genres}
                                    onChange={handleInputChange}
                                    placeholder="Genres (comma-separated)"
                                    />

                                    <label className="flex gap-2 items-center text-sm">
                                    <input
                                        type="checkbox"
                                        name="nowShowing"
                                        checked={newMovie.nowShowing}
                                        onChange={(e) =>
                                        setNewMovie((prev) => ({
                                            ...prev,
                                            nowShowing: e.target.checked
                                        }))
                                        }
                                    />
                                    Now Showing
                                    </label>

                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={handleAddMovie}>Submit</button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Movie Grid */}
                    {movies.length > 0 && (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {movies.map((movie) => (
                                <Card key={movie._id}>
                                    <CardHeader>
                                        <CardTitle className="text-base font-semibold">{movie.title}</CardTitle>
                                        {/* <CardDescription></CardDescription> */}
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <p className="text-xs text-muted-foreground">{new Date(movie.releaseDate).toLocaleDateString()}</p>
                                        <p className="text-xs text-muted-foreground">{movie.description}</p>
                                        <p className="text-xs text-muted-foreground">Genres: {movie.genres.join(', ')}</p>
                                        <p className="text-xs text-muted-foreground">Rating: {movie.rating}</p>
                                        <p className="text-xs text-muted-foreground">Duration: {movie.duration}</p>
                                        {/* <button onClick={() => handleDeleteMovie(movie._id)} className="text-red-600 text-sm underline">Delete</button> */}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
