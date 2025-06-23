import express from 'express';
import { verifyUser } from '../middleware/auth.js';
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
router.post('/new-booking', verifyUser, createBooking);

// Get booking by ID
router.get('/:id', verifyUser, getBookingById);

// Get booking by reference number
router.get('/reference/:reference', verifyUser, getBookingByReference);

// Get all bookings for a user
router.get('/user/:userId', verifyUser, getUserBookings);

// Cancel a booking
router.put('/:id/cancel', verifyUser, cancelBooking);

// Update booking status (admin only)
router.put('/:id/status', verifyUser, updateBookingStatus);

// Add food and drinks to booking
router.post('/:id/food-drinks', verifyUser, addFoodDrinksToBooking);

// Remove food and drinks from booking
router.delete('/:id/food-drinks', verifyUser, removeFoodDrinksFromBooking);

export default router;