import Movie from "../models/Movie.js";
import { NowShowing, ComingSoon } from "../models/Movie.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
dotenv.config();


export const addMovie = async(req,res,next)=>{

  const extractedToken = req.headers.authorization.split(' ')[1];
  if(!extractedToken && extractedToken.trim() === ""){
    return res.status(404).json({message:"Token Not Found"})
  }
//console.log(extractedToken);
let adminId;
jwt.verify(extractedToken,process.env.SECRET_KEY, (err, decrypted) => {
   if(err){
    return res.status(400).json({message: `${err.message}`})
   }else{
    adminId  = decrypted.id;
    return;
   }
});

const {title, description, releaseDate, posterUrl, featured, actors } = req.body;

if(!title && title.trim() === "" && 
!description && description.trim() ==="" &&
 !posterUrl && posterUrl.trim() === ""){
    return res.status(422).json({message:"Invalid Inputs"})
}
let movie;
try {
  movie =new Movie({title,
    description,
    releaseDate: new Date(`${releaseDate}`),
    posterUrl,
    featured,
    actors,
    admin: adminId
  
  }) 
const session =await mongoose.startSession();

const adminUser = await Admin.findById(adminId);
session.startTransaction();
await movie.save({session})
adminUser.addedmovies.push(movie);
await adminUser.save({session});
await session.commitTransaction(); // means stop the transaction

} catch (error) {
  return console.log(error)
}
 if(!movie){
  return res.status(500).json({message:"Request Failed"});
 }
 return res.status(201).json({movie})

}

export const getMovies = async(req, res, next)=>{
   let movies;
   try {
    movies = await Movie.find();
    
   }catch (error) {
     return console.log(error)
   }
   if(!movies){
    return res.status(500).json({message:"Request Failed"})
   }

    return res.status(200).json({movies})

}
export const getMovieById = async(req, res, next)=>{
  const id = req.params.id;
  
  let movie;
  try {
    // First try to find by numeric id
    movie = await Movie.findOne({ id: parseInt(id) });
    
    // If not found by numeric id and the id looks like a MongoDB ObjectId, try finding by _id
    if (!movie && mongoose.Types.ObjectId.isValid(id)) {
      movie = await Movie.findById(id);
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching movie", error: error.message });
  }

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ movie });
}

export const getNowShowingMovies = async(req, res, next)=>{
  let movies;
  try {
    movies = await NowShowing.find();
  } catch (error) {
    return res.status(500).json({ message: "Error fetching now showing movies", error: error.message });
  }
  if(!movies){
    return res.status(404).json({message:"No movies found"})
  }
  return res.status(200).json({movies})
}

export const getComingSoonMovies = async(req, res, next)=>{
  let movies;
  try {
    movies = await ComingSoon.find();
  } catch (error) {
    return res.status(500).json({ message: "Error fetching coming soon movies", error: error.message });
  }
  if(!movies){
    return res.status(404).json({message:"No movies found"})
  }
  return res.status(200).json({movies})
}
