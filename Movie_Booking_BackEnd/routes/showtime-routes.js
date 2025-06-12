import express from 'express';
import { addShowtime, getShowtimes, deleteShowtime } from '../controllers/showtime-controller.js';
import { verifyAdmin } from '../middleware/auth.js';

const showtimeRouter = express.Router();

// Public routes
showtimeRouter.get("/", getShowtimes);

// Admin routes
showtimeRouter.post("/", verifyAdmin, addShowtime);
showtimeRouter.delete("/:id", verifyAdmin, deleteShowtime);

export default showtimeRouter; 