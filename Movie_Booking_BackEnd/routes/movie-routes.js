import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';
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
router.post('/', verifyToken, verifyAdmin, createMovie);
router.put('/:id', verifyToken, verifyAdmin, updateMovie);
router.delete('/:id', verifyToken, verifyAdmin, deleteMovie);
router.put('/:id/toggle-showing', verifyToken, verifyAdmin, toggleNowShowing);

export default router;