import express from 'express';
import {
  addAdmin,
  adminLogin,
  createMovie,
  deleteMovie,
  getAdminById,
  getAdmins,
  updateMovie
} from '../controllers/admin-controller.js';
import { verifyAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';
import { validate, validateMovie } from '../middleware/validators.js';

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
adminRouter.post('/movies',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'wallpaper', maxCount: 1 }
  ]),
  validateMovie, validate, createMovie);
adminRouter.put('/movies/:id', validateMovie, validate, updateMovie);
adminRouter.delete('/movies/:id', deleteMovie);

export default adminRouter;