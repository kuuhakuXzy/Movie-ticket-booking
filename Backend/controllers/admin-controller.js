import Admin from "../models/Admin.js";
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
      { id: existAdmin._id, email: existAdmin.email },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    logger.info(`Admin login successful: ${email}`);
    res.status(200).json({
      message: "Authentication Complete!!",
      token,
      id: existAdmin._id,
      email: existAdmin.email
    });
};

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