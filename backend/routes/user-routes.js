import express from "express";
import { addNewUser, deleteUser, getBookingsOfUser, getUserById, login, updateUser } from "../controllers/user-controller.js";
import { verifyUser } from "../middleware/auth.js";
import { validate, validateUser } from "../middleware/validators.js";

const userRouter = express.Router();

// Public routes
userRouter.post('/signup', addNewUser);
userRouter.post('/login', login);

// Protected routes - require authentication
userRouter.get('/profile', verifyUser, getUserById);
userRouter.put('/profile', verifyUser, validateUser, validate, updateUser);
userRouter.delete("/profile", verifyUser, deleteUser);
userRouter.get("/bookings", verifyUser, getBookingsOfUser);

export default userRouter;