import express from "express";
import { addNewUser, updateUser, deleteUser, login, getBookingsOfUser, getUserById } from "../controllers/user-controller.js";
import { validateUser, validate } from "../middleware/validators.js";
import { authenticateToken } from "../middleware/auth.js";

const userRouter = express.Router();

// Public routes
userRouter.post('/signup', validateUser, validate, addNewUser);
userRouter.post('/login', login);

// Protected routes - require authentication
userRouter.get('/profile', authenticateToken, getUserById);
userRouter.put('/profile', authenticateToken, validateUser, validate, updateUser);
userRouter.delete("/profile", authenticateToken, deleteUser);
userRouter.get("/bookings", authenticateToken, getBookingsOfUser);

export default userRouter;