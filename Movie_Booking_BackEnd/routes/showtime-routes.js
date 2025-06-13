import express from 'express';
import { verifyUser, verifyAdmin } from '../middleware/auth.js';
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
router.post('/', verifyUser, verifyAdmin, createShowtime);
router.put('/:id', verifyUser, verifyAdmin, updateShowtime);
router.delete('/:id', verifyUser, verifyAdmin, deleteShowtime);
router.put('/:id/seats/:seatNumber', verifyUser, updateSeatStatus);

export default router; 