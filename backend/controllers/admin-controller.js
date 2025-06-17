import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Admin from "../models/Admin.js";
import Movie from "../models/Movie.js";
import logger from '../utils/logger.js';
dotenv.config();

export const addAdmin = async(req, res, next) => {
  const {email, password} = req.body;

  // Validate inputs
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(422).json({message: "Email and password are required"});
  }

  let existAdmin;
  try {
    existAdmin = await Admin.findOne({email});
  } catch (error) {
    logger.error(`Admin lookup error: ${error.message}`);
    return res.status(500).json({message: "Internal server error"});
  }

  if(existAdmin) {
    logger.warn(`Admin creation failed: Email ${email} already exists`);
    return res.status(400).json({message: "Admin already exists"});
  }

  try {
    // Hash the password with a salt round of 10
    const hashPwd = await bcrypt.hash(password, 10);
    const admin = new Admin({email, password: hashPwd});
    await admin.save();
    
    logger.info(`New admin created: ${email}`);
    return res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    logger.error(`Admin creation error: ${error.message}`);
    return res.status(500).json({message: "Unable to create admin"});
  }
};

export const adminLogin = async(req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password || email.trim() === "" || password.trim() === "") {
      return res.status(422).json({message: "Invalid Inputs"});
    }

    let existAdmin;
    try {
      existAdmin = await Admin.findOne({email});
    } catch (error) {
      logger.error(`Admin login error: ${error.message}`);
      return res.status(500).json({message: "Internal server error"});
    }

    if(!existAdmin) {
      logger.warn(`Admin login failed: Invalid email ${email}`);
      return res.status(404).json({message: "Admin not found"});
    }

    const isPwdCorrect = await bcrypt.compare(password, existAdmin.password);

    if(!isPwdCorrect) {
      logger.warn(`Admin login failed: Invalid password for ${email}`);
      return res.status(401).json({message: "Password incorrect"});
    }

    const token = jwt.sign(
      { id: existAdmin._id, email: existAdmin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    logger.info(`Admin login successful: ${email}`);
    res.status(200).json({
      message: "Authentication Complete!!",
      token,
      id: existAdmin._id,
      email: existAdmin.email,
      role: "admin",
    });
};

export const createMovie = async(req, res) => {
  const extractedToken = req.headers.authorization.split(' ')[1];
  if(!extractedToken && extractedToken.trim() === ""){
    return res.status(404).json({message:"Token Not Found"})
  }

  let adminId;
  jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
    if(err){
      return res.status(400).json({message: `${err.message}`})
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  const { id, title, description, releaseDate, rating, duration, genres, nowShowing } = req.body;

  const imageFile = req.files?.image?.[0];
  const wallpaperFile = req.files?.wallpaper?.[0];
  const formattedDate = new Date(releaseDate).toLocaleDateString('en-GB').replace(/\//g, '-');

  if (!imageFile || !wallpaperFile) {
    return res.status(400).json({ message: "Image and wallpaper files are required" });
  }

  let movie;
  try {
    movie = new Movie({
      id,
      title,
      description,
      releaseDate: formattedDate,
      image: `/static/${imageFile.filename}`,
      wallpaper: `/static/${wallpaperFile.filesname}`,
      rating,
      duration,
      genres,
      nowShowing,
      admin: adminId,
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);

    session.startTransaction();

    await movie.save({session})
    adminUser.addedmovies.push(movie);
    await adminUser.save({session});

    await session.commitTransaction();
  } catch (error) {
    return res.status(500).json({message: "Error creating movie", error: error.message});
  }

  if (!movie) {
    return res.status(500).json({message:"Request Failed"});
  }
  return res.status(201).json({movie})
}

export const getAdmins = async(req, res, next) => {
  try {
    const admins = await Admin.find().select('-password');
    res.status(200).json({admins});
  } catch (error) {
    logger.error(`Get admins error: ${error.message}`);
    res.status(500).json({message: "Internal Server error"});
  }
};

export const getAdminById = async(req, res, next) => {
  const id = req.params.id;

  try {
    const admin = await Admin.findById(id).select('-password');
    if(!admin) {
      return res.status(404).json({message: "Admin not found"});
    }
    res.status(200).json({admin});
  } catch (error) {
    logger.error(`Get admin by ID error: ${error.message}`);
    res.status(500).json({message: "Something went wrong"});
  }
};



export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const movie = await Movie.findOneAndUpdate(
      { _id: id, admin: req.admin._id },
      updates,
      { new: true }
    );

    if (!movie) {
      logger.warn(`Movie update failed: Movie ${id} not found or unauthorized`);
      return res.status(404).json({ message: 'Movie not found or unauthorized' });
    }

    logger.info(`Movie updated: ${movie.title} by admin ${req.admin._id}`);
    res.status(200).json({ message: 'Movie updated successfully', movie });
  } catch (error) {
    logger.error(`Movie update error: ${error.message}`);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findOneAndDelete({ _id: id, admin: req.admin._id });

    if (!movie) {
      logger.warn(`Movie deletion failed: Movie ${id} not found or unauthorized`);
      return res.status(404).json({ message: 'Movie not found or unauthorized' });
    }

    logger.info(`Movie deleted: ${movie.title} by admin ${req.admin._id}`);
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    logger.error(`Movie deletion error: ${error.message}`);
    res.status(500).json({ message: 'Something went wrong' });
  }
};