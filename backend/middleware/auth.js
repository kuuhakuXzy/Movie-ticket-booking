import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

export const adminAuth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      logger.warn('Admin authentication failed: No token provided');
      return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
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