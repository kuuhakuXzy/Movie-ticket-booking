import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';
import {
  getAllShowtimes,
  getShowtimeById,
  createShowtime,
  updateShowtime,
  deleteShowtime,
  getShowtimesByMovie,
  getAvailableSeats,
  updateSeatStatus
} from '../controllers/showtime-controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllShowtimes);
router.get('/movie/:movieId', getShowtimesByMovie);
router.get('/:id', getShowtimeById);
router.get('/:id/seats', getAvailableSeats);

// Admin routes
router.post('/', verifyToken, verifyAdmin, createShowtime);
router.put('/:id', verifyToken, verifyAdmin, updateShowtime);
router.delete('/:id', verifyToken, verifyAdmin, deleteShowtime);
router.put('/:id/seats/:seatNumber', verifyToken, updateSeatStatus);

export default router; 