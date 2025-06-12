import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';
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
router.post('/', verifyToken, verifyAdmin, createFoodDrink);
router.put('/:id', verifyToken, verifyAdmin, updateFoodDrink);
router.delete('/:id', verifyToken, verifyAdmin, deleteFoodDrink);
router.put('/:id/toggle-availability', verifyToken, verifyAdmin, toggleAvailability);

export default router; 