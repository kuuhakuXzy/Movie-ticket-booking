import express from 'express';
import {
  createMovie,
  getAllMovies,
  getComingSoonMovies,
  getMovieById,
  getNowShowingMovies
} from '../controllers/movie-controller.js';
import { verifyAdmin } from '../middleware/auth.js';
import { validateMovie } from '../middleware/validators.js';

const router = express.Router();

// Public routes
router.get('/all-movies', getAllMovies);
router.get('/now-showing', getNowShowingMovies);
router.get('/coming-soon', getComingSoonMovies);
router.get('/:id', getMovieById);

// Admin routes
router.post('/add-movie', verifyAdmin, validateMovie, createMovie);
// router.put('/:id', verifyUser, verifyAdmin, updateMovie);
// router.delete('/:id', verifyUser, verifyAdmin, deleteMovie);
// router.put('/:id/toggle-showing', verifyUser, verifyAdmin, toggleNowShowing);

export default router;