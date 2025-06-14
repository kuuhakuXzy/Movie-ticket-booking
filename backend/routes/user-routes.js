import express from "express";
import { addNewUser, updateUser, deleteUser, login, getBookingsOfUser, getUserById } from "../controllers/user-controller.js";
import { validateUser, validate } from "../middleware/validators.js";
import { verifyUser } from "../middleware/auth.js";

const userRouter = express.Router();

// Public routes
userRouter.post('/signup', validateUser, validate, addNewUser);
userRouter.post('/login', login);

// Protected routes - require authentication
userRouter.get('/profile', verifyUser, getUserById);
userRouter.put('/profile', verifyUser, validateUser, validate, updateUser);
userRouter.delete("/profile", verifyUser, deleteUser);
userRouter.get("/bookings", verifyUser, getBookingsOfUser);

export default userRouter;