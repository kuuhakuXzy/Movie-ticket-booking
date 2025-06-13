import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

export const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      logger.warn('No authorization header provided');
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      logger.warn('No token found in authorization header');
      return res.status(401).json({ message: "No token provided" });
    }

    if (!process.env.SECRET_KEY) {
      logger.error('SECRET_KEY is not defined in environment variables');
      return res.status(500).json({ message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      logger.warn(`Admin not found for token: ${decoded.id}`);
      return res.status(401).json({ message: "Invalid token" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token format" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      logger.warn('No authorization header provided');
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      logger.warn('No token found in authorization header');
      return res.status(401).json({ message: "No token provided" });
    }

    if (!process.env.SECRET_KEY) {
      logger.error('SECRET_KEY is not defined in environment variables');
      return res.status(500).json({ message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token format" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};

export const adminAuth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      logger.warn('Admin authentication failed: No token provided');
      return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    if (decoded.role !== 'admin') {
      logger.warn(`Admin authentication failed: User ${decoded.id} is not an admin`);
      return res.status(403).json({ message: 'Access denied: Admin privileges required' });
    }

    req.adminId = decoded.id;
    next();
  } catch (error) {
    logger.error(`Admin authentication error: ${error.message}`);
    res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token." });
    }
}; 