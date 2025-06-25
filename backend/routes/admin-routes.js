import express from 'express';
import {
  addAdmin,
  adminLogin,
  getAdminById,
  getAdmins,
} from '../controllers/admin-controller.js';
import { verifyAdmin } from '../middleware/auth.js';

const adminRouter = express.Router();

// Public routes
adminRouter.post('/signup', addAdmin);
adminRouter.post('/login', adminLogin);

// Protected routes (require admin authentication)
adminRouter.use(verifyAdmin);

// Admin management routes
adminRouter.get("/", getAdmins);
adminRouter.get('/:id', getAdminById);


export default adminRouter;