import express from 'express';
import {
  createShowtime,
  deleteShowtime,
  getAllShowtimes,
  getAvailableSeats,
  getShowtimeById,
  getShowtimesByMovie,
  updateSeatStatus,
  updateShowtime
} from '../controllers/showtime-controller.js';
import { verifyAdmin, verifyUser } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/all-showtime', getAllShowtimes);
router.get('/movie/:movieId', getShowtimesByMovie);
router.get('/:id', getShowtimeById);
router.get('/:id/seats', getAvailableSeats);

// Admin routes
router.post('/addShowtime', verifyAdmin, createShowtime);
// router.put('/:id', verifyUser, verifyAdmin, updateShowtime);
// router.delete('/:id', verifyUser, verifyAdmin, deleteShowtime);
// router.put('/:id/seats/:seatNumber', verifyUser, updateSeatStatus);

export default router;