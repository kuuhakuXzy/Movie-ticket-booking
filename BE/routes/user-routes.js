import express from "express";
import { getAllUsers, addNewUser, updateUser, deleteUser, login, getBookingsOfUser, getUserById } from "../controllers/user-controller.js";
import { validateUser, validate } from "../middleware/validators.js";

const userRouter = express.Router();

// Public routes
userRouter.post('/signup', validateUser, validate, addNewUser);
userRouter.post('/login', login);

// Protected routes (you might want to add authentication middleware here)
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', validateUser, validate, updateUser);
userRouter.delete("/del/:id", deleteUser);
userRouter.get("/bookings/:id", getBookingsOfUser);

export default userRouter;