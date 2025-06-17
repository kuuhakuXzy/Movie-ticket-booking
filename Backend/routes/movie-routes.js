import express from 'express';
import { verifyUser, verifyAdmin } from '../middleware/auth.js';
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleNowShowing,
  getNowShowingMovies,
  getComingSoonMovies
} from '../controllers/movie-controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllMovies);
router.get('/now-showing', getNowShowingMovies);
router.get('/coming-soon', getComingSoonMovies);
router.get('/:id', getMovieById);

// Admin routes
router.post('/', verifyAdmin, createMovie);
router.put('/:id', verifyAdmin, updateMovie);
router.delete('/:id', verifyAdmin, deleteMovie);
router.put('/:id/toggle-showing', verifyAdmin, toggleNowShowing);

export default router;