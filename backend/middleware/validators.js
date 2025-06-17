import { body, validationResult } from 'express-validator';

// User validation middleware
export const validateUser = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email'),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// Movie validation middleware
export const validateMovie = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Movie title is required'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Movie description is required'),
  
  body('releaseDate')
    .isISO8601()
    .withMessage('Please enter a valid release date'),
  
  body('duration')
  .matches(/^\d+\s?minutes$/i)
  .withMessage('Duration must be in the format like "120 minutes"')
];

// Booking validation middleware
export const validateBooking = [
  body('movieId')
    .notEmpty()
    .withMessage('Movie ID is required')
    .isMongoId()
    .withMessage('Invalid movie ID'),
  
  body('showTime')
    .isISO8601()
    .withMessage('Please enter a valid show time'),
  
  body('seats')
    .isArray({ min: 1 })
    .withMessage('At least one seat must be selected'),
  
  body('seats.*')
    .isString()
    .withMessage('Invalid seat format'),
];

// Admin validation middleware
export const validateAdmin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required'),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// Validation result handler
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}; 