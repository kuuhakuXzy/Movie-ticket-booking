import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  createBooking,
  getBookingById,
  getUserBookings,
  cancelBooking,
  updateBookingStatus,
  getBookingByReference,
  addFoodDrinksToBooking,
  removeFoodDrinksFromBooking
} from '../controllers/booking-controller.js';

const router = express.Router();

// Create a new booking
router.post('/', verifyToken, createBooking);

// Get booking by ID
router.get('/:id', verifyToken, getBookingById);

// Get booking by reference number
router.get('/reference/:reference', verifyToken, getBookingByReference);

// Get all bookings for a user
router.get('/user/:userId', verifyToken, getUserBookings);

// Cancel a booking
router.put('/:id/cancel', verifyToken, cancelBooking);

// Update booking status (admin only)
router.put('/:id/status', verifyToken, updateBookingStatus);

// Add food and drinks to booking
router.post('/:id/food-drinks', verifyToken, addFoodDrinksToBooking);

// Remove food and drinks from booking
router.delete('/:id/food-drinks', verifyToken, removeFoodDrinksFromBooking);

export default router;