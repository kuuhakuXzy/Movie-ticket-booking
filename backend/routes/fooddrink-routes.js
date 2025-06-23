import express from 'express';
import {
  createFoodDrink,
  getAllFoodDrinks,
  getFoodDrinkById,
} from '../controllers/fooddrink-controller.js';
import { validateFoodDrink } from '../middleware/validators.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/all', getAllFoodDrinks);
// router.get('/category/:category', getFoodDrinksByCategory);
router.get('/:id', getFoodDrinkById);

// Admin routes
router.post('/add-foodDrink', verifyAdmin, validateFoodDrink, createFoodDrink);
// router.put('/:id', verifyUser, verifyAdmin, updateFoodDrink);
// router.delete('/:id', verifyUser, verifyAdmin, deleteFoodDrink);
// router.put('/:id/toggle-availability', verifyUser, verifyAdmin, toggleAvailability);

export default router;