import express from 'express';
import { 
  addAdmin, 
  adminLogin, 
  getAdmins, 
  getAdminById,
  addMovie,
  updateMovie,
  deleteMovie 
} from '../controllers/admin-controller.js';
import { verifyAdmin } from '../middleware/auth.js';
import { validateMovie, validate } from '../middleware/validators.js';

const adminRouter = express.Router();

// Public routes
adminRouter.post('/signup', addAdmin);
adminRouter.post('/login', adminLogin);

// Protected routes (require admin authentication)
adminRouter.use(verifyAdmin);

// Admin management routes
adminRouter.get("/", getAdmins);
adminRouter.get('/:id', getAdminById);

// Movie management routes
adminRouter.post('/movies', validateMovie, validate, addMovie);
adminRouter.put('/movies/:id', validateMovie, validate, updateMovie);
adminRouter.delete('/movies/:id', deleteMovie);

export default adminRouter;