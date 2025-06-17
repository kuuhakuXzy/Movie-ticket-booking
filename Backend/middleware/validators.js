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
    .withMessage('Movie title is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Movie description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('releaseDate')
    .isISO8601()
    .withMessage('Please enter a valid release date'),
  
  body('image')
    .trim()
    .notEmpty()
    .withMessage('Movie image URL is required')
    .isURL()
    .withMessage('Please enter a valid image URL'),
  
  body('wallpaper')
    .trim()
    .notEmpty()
    .withMessage('Movie wallpaper URL is required')
    .isURL()
    .withMessage('Please enter a valid wallpaper URL'),
  
  body('rating')
    .trim()
    .notEmpty()
    .withMessage('Movie rating is required')
    .matches(/^(G|PG|PG-13|R|NC-17)$/)
    .withMessage('Invalid rating. Must be one of: G, PG, PG-13, R, NC-17'),
  
  body('duration')
    .trim()
    .notEmpty()
    .withMessage('Movie duration is required')
    .matches(/^\d+h\s\d+m$/)
    .withMessage('Duration must be in format: Xh Ym'),
  
  body('genres')
    .isArray({ min: 1 })
    .withMessage('At least one genre is required'),
  
  body('genres.*')
    .isString()
    .withMessage('Each genre must be a string'),
];

// Food and Drink validation middleware
export const validateFoodDrink = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 200 })
    .withMessage('Description must be between 10 and 200 characters'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Food', 'Drink', 'Combo'])
    .withMessage('Category must be one of: Food, Drink, Combo'),
  
  body('image')
    .trim()
    .notEmpty()
    .withMessage('Image URL is required')
    .isURL()
    .withMessage('Please enter a valid image URL'),
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
  
  body('foodDrinks')
    .optional()
    .isArray()
    .withMessage('Food and drinks must be an array'),
  
  body('foodDrinks.*.itemId')
    .optional()
    .isMongoId()
    .withMessage('Invalid food/drink item ID'),
  
  body('foodDrinks.*.quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive number'),
];

// Admin validation middleware
export const validateAdmin = [
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

// Showtime validation middleware
export const validateShowtime = [
  body('movieId')
    .notEmpty()
    .withMessage('Movie ID is required')
    .isMongoId()
    .withMessage('Invalid movie ID'),
  
  body('cinema')
    .trim()
    .notEmpty()
    .withMessage('Cinema name is required'),
  
  body('hall')
    .trim()
    .notEmpty()
    .withMessage('Hall name is required'),
  
  body('date')
    .isISO8601()
    .withMessage('Please enter a valid date'),
  
  body('startTime')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format'),
  
  body('endTime')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('End time must be in HH:MM format'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
];

// Validation result handler
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}; 