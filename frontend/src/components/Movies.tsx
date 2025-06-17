import axios from "axios";
import { useEffect, useState } from "react";

interface Movie {
    _id: string;
    title: string;
    description: string;
    releaseDate: string;
    posterUrl: string;
    featured: boolean;
    actors: string[];
}

export default function Movies() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        axios
        .get<{ movies: Movie[] }>("http://localhost:5000/movie/now-showing")
        .then((res) => setMovies(res.data.movies))
        .catch((err) => console.error(err));
    }, []);

    return (
        <div>
        {movies.map((movie) => (
            <div key={movie._id}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            </div>
        ))}
        </div>
    );
}