import Bookings from '../models/Bookings.js';
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const addNewUser = async (req,res,next)=>{
  const {email, password } = req.body;
    if(!email && email.trim() === ""
    && !password && password.trim() === ""){
      return res.status(422).json({message: "Invalid Inputs"})
    }
    const hashPwd = bcrypt.hashSync(password)
    let user;
    try {
      user = new User({email, password:hashPwd})
      user = await user.save()
    } catch (error) {
      return console.log(error)
    }
    if(!user){
      return res.status(500).json({message: "Unexpected Error Occured"})
    }
    return res.status(201).json({ id: user._id })
}

export const updateUser = async(req, res, next)=>{
  const userId = req.user.id; // Get user ID from authenticated token
  const {email, password } = req.body

  if(!name && name.trim() === "" 
  && !email && email.trim() === "" 
  && !password && password.trim() === ""){
    return res.status(422).json({message: "Invalid Inputs"})
  }  
  const hashPwd = bcrypt.hashSync(password);
  let user;
  try {
    user = await User.findByIdAndUpdate(userId, {name, email, password:hashPwd}) 
  } catch (error) {
    return console.log(error)
  }
  if(!user){
    return res.status(500).json({message: "Something went wrong"})
  }
  res.status(200).json({message:"User Details Updated!"})
}

export const deleteUser = async(req, res, next)=>{
  const userId = req.user.id; // Get user ID from authenticated token
  let user;
  try {
    user = await User.findByIdAndDelete(userId) 
  } catch (error) {
    return console.log(error)
  }
  if(!user){
    return res.status(500).json({message: "Something went wrong"})
  }
  return res.status(200).json({message:"User deleted!"})
}

export const login = async(req, res, next)=>{
  const {email, password} = req.body;

  if(email && email.trim()==="" && password && password.trim() === ""){
    return res.status(422).json({message:"Invalid Inputs"})
  }
  let user;
  try {
    user = await User.findOne({email})
  } catch (error) {
    return console.log(error)
  }

  if(!user){
    return res.status(404).json({message:"Unable to find user with this email"})
  }

  let isCrtPwd = bcrypt.compareSync(password, user.password)

  if(!isCrtPwd){
    return res.status(404).json({message:"Incorrect password"})
  }
  
  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  return res.status(200).json({
    message: "Login successfully!",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  })
}

export const getBookingsOfUser = async(req, res, next)=>{
  const userId = req.user.id; // Get user ID from authenticated token
  let bookings;
  try {
    bookings = await Bookings.find({user: userId})
  } catch (error) {
    return console.log(error)
  }
  if(!bookings){
    return res.status(500).json({message:"Unable to get bookings"});
  }
  return res.status(200).json({ bookings })
}

export const getUserById = async(req,res,next)=>{
  const userId = req.user.id; // Get user ID from authenticated token
  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return console.log(error)
  }
  if(!user){
    return res.status(500).json({message: "Unexpected Error Occurred"})
  }

  return res.status(200).json({ user })
}