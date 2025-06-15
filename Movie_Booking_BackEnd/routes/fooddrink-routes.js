import express from 'express';
import { verifyUser, verifyAdmin } from '../middleware/auth.js';
import {
  getAllFoodDrinks,
  getFoodDrinkById,
  createFoodDrink,
  updateFoodDrink,
  deleteFoodDrink,
  getFoodDrinksByCategory,
  toggleAvailability
} from '../controllers/fooddrink-controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllFoodDrinks);
router.get('/category/:category', getFoodDrinksByCategory);
router.get('/:id', getFoodDrinkById);

// Admin routes
router.post('/', verifyAdmin, createFoodDrink);
router.put('/:id', verifyAdmin, updateFoodDrink);
router.delete('/:id', verifyAdmin, deleteFoodDrink);
router.put('/:id/toggle-availability', verifyAdmin, toggleAvailability);

export default router; 