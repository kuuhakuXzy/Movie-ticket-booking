import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import dbconnect from './DB/dbconfig.js';
import adminRouter from './routes/admin-routes.js';
import bookingRouter from './routes/booking-routes.js';
import foodDrinkRouter from './routes/fooddrink-routes.js';
import movieRouter from './routes/movie-routes.js';
import showtimeRouter from './routes/showtime-routes.js';
import userRouter from './routes/user-routes.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();
dbconnect();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://movie-ticket-booking-i8w3.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use('/movie', movieRouter);
app.use('/booking', bookingRouter);
app.use('/showtime', showtimeRouter);
app.use('/food-drink', foodDrinkRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  logger.warn(`404 - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404
    }
  });
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
  logger.info('Database connected successfully');
});




