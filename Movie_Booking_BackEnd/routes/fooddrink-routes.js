import express from 'express';
import { addFoodDrink, getFoodDrinks, updateFoodDrink, deleteFoodDrink } from '../controllers/fooddrink-controller.js';
import { verifyAdmin } from '../middleware/auth.js';

const foodDrinkRouter = express.Router();

// Public routes
foodDrinkRouter.get("/", getFoodDrinks);

// Admin routes
foodDrinkRouter.post("/", verifyAdmin, addFoodDrink);
foodDrinkRouter.put("/:id", verifyAdmin, updateFoodDrink);
foodDrinkRouter.delete("/:id", verifyAdmin, deleteFoodDrink);

export default foodDrinkRouter; 