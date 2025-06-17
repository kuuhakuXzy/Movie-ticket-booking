import express from 'express';
import { Movie } from '../models/movie.model';

const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json({ movies });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error });
    }
});

// Get now showing movies
router.get('/now-showing', async (req, res) => {
    try {
        const movies = await Movie.find({ isNowShowing: true });
        res.json({ movies });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching now showing movies', error });
    }
});

// Get coming soon movies
router.get('/coming-soon', async (req, res) => {
    try {
        const movies = await Movie.find({ isComingSoon: true });
        res.json({ movies });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching coming soon movies', error });
    }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({ movie });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie', error });
    }
});

export default router; 