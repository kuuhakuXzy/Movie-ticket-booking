import DunePoster from '@/assets/poster/Dune.jpg';
import InterstellarPoster from '@/assets/poster/Interstellar.jpg';

import DuneWallpaper from '@/assets/wallpaper/Dune-Wallpaper.jpg';
import InterstellarWallpaper from '@/assets/wallpaper/Interstellar-Wallpaper.jpg';

export interface Movie {
    id: number;
    title: string;
    image: string;
    wallpaper: string;
    rating: string;
    duration: string;
    releaseDate: string;
    genres: string;
    description: string;
}

export const movieData: Movie[] = [
    {
        id: 1,
        title: "Dune",
        image: DunePoster,
        wallpaper: DuneWallpaper,
        rating: "13+",
        duration: "155 minutes",
        releaseDate: "10 February 2021",
        genres: "Science Fiction, Epic, Adventure",
        description: "Dune follows the emotional, epic journey of Paul Atreides...",
    },
    {
        id: 2,
        title: "Interstellar",
        image: InterstellarPoster,
        wallpaper: InterstellarWallpaper,
        rating: "13+",
        duration: "169 minutes",
        releaseDate: "7 November 2014",
        genres: "Science Fiction, Drama, Adventure",
        description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    },
];
