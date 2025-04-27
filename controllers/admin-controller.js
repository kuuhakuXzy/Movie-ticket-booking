import Admin from "../models/Admin.js";
import Movie from "../models/Movie.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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

export const adminLogin = async(req, res, next)=>{
    const {email, password} = req.body;

    if(email && email.trim()==="" &&  password && password.trim() === ""){
      return res.status(422).json({message:"Invalid Inputs"})
    }
   
    let existAdmin;
    try {

      existAdmin = await Admin.findOne({email})
      
    } catch (error) {
      return console.log(error)
    }
    if(!existAdmin){
      logger.warn(`Admin login failed: Invalid email ${email}`);
      return res.status(404).json("Admin not found")
    }
    let isPwdCrt = bcrypt.compareSync(password, existAdmin.password)

    if(!isPwdCrt){
      logger.warn(`Admin login failed: Invalid password for ${email}`);
      return res.status(404).json({message:"Password incorrect"})
    }

  const token = jwt.sign({ id: existAdmin._id}, process.env.SECRET_KEY,{ expiresIn:"100d"})
  logger.info(`Admin login successful: ${email}`);

    res.status(200).json({message:"Authentication Complete!!",token, id: existAdmin._id})

}

export const getAdmins = async(req, res, next)=>{
   let admin;
   try {

    admin = await Admin.find().select('-password');
    
   } catch (error) {
      logger.error(`Get admins error: ${error.message}`);
      return res.status(500).json({message:"Internal Server error"})
   }
   if(!admin){
    return res.status(500).json({message:"Internal Server error"})
   }
   return res.status(200).json({admin})
}

export const getAdminById = async(req, res, next)=>{
   let id = req.params.id;

   let admin;
   try {
    admin = await Admin.findById(id).select('-password');
    
   } catch (error) {
      logger.error(`Get admin by ID error: ${error.message}`);
      return res.status(500).json({ message: 'Something went wrong' });
   }
   if(!admin){
    return res.status(404).json({ message: 'Admin not found' });
   }

   return res.status(200).json({admin })
}

export const addMovie = async (req, res) => {
  try {
    const { title, description, actors, releaseDate, posterUrl, featured } = req.body;
    
    const movie = new Movie({
      title,
      description,
      actors,
      releaseDate,
      posterUrl,
      featured: featured || false,
      admin: req.adminId
    });

    await movie.save();
    logger.info(`New movie added: ${title} by admin ${req.adminId}`);
    res.status(201).json({ message: 'Movie added successfully', movie });
  } catch (error) {
    logger.error(`Movie addition error: ${error.message}`);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const movie = await Movie.findOneAndUpdate(
      { _id: id, admin: req.adminId },
      updates,
      { new: true }
    );

    if (!movie) {
      logger.warn(`Movie update failed: Movie ${id} not found or unauthorized`);
      return res.status(404).json({ message: 'Movie not found or unauthorized' });
    }

    logger.info(`Movie updated: ${movie.title} by admin ${req.adminId}`);
    res.status(200).json({ message: 'Movie updated successfully', movie });
  } catch (error) {
    logger.error(`Movie update error: ${error.message}`);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findOneAndDelete({ _id: id, admin: req.adminId });

    if (!movie) {
      logger.warn(`Movie deletion failed: Movie ${id} not found or unauthorized`);
      return res.status(404).json({ message: 'Movie not found or unauthorized' });
    }

    logger.info(`Movie deleted: ${movie.title} by admin ${req.adminId}`);
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    logger.error(`Movie deletion error: ${error.message}`);
    res.status(500).json({ message: 'Something went wrong' });
  }
};