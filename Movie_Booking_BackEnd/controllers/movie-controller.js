import { NowShowing, ComingSoon } from "../models/Movie.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
dotenv.config();

export const createMovie = async(req,res,next)=>{
  const extractedToken = req.headers.authorization.split(' ')[1];
  if(!extractedToken && extractedToken.trim() === ""){
    return res.status(404).json({message:"Token Not Found"})
  }

  let adminId;
  jwt.verify(extractedToken,process.env.SECRET_KEY, (err, decrypted) => {
    if(err){
      return res.status(400).json({message: `${err.message}`})
    }else{
      adminId = decrypted.id;
      return;
    }
  });

  const {title, description, releaseDate, image, wallpaper, rating, duration, genres } = req.body;

  if(!title && title.trim() === "" && 
  !description && description.trim() ==="" &&
  !image && image.trim() === "" &&
  !wallpaper && wallpaper.trim() === "" &&
  !rating && rating.trim() === "" &&
  !duration && duration.trim() === "" &&
  !genres && genres.trim() === ""){
    return res.status(422).json({message:"Invalid Inputs"})
  }

  let movie;
  try {
    // Get the count of existing movies to generate a new ID
    const nowShowingCount = await NowShowing.countDocuments();
    const comingSoonCount = await ComingSoon.countDocuments();
    const movieCount = nowShowingCount + comingSoonCount;
    
    movie = new ComingSoon({
      id: movieCount + 1,
      title,
      description,
      releaseDate,
      image,
      wallpaper,
      rating,
      duration,
      genres,
      nowShowing: false,
      admin: adminId
    }) 
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

  if(!movie){
    return res.status(500).json({message:"Request Failed"});
  }
  return res.status(201).json({movie})
}

export const getAllMovies = async(req, res, next)=>{
  let nowShowingMovies;
  let comingSoonMovies;
  let movies;
  try {
    // Get all movies from NowShowing and ComingSoon collections
    nowShowingMovies = await NowShowing.find();
    comingSoonMovies = await ComingSoon.find();
    movies = [...nowShowingMovies, ...comingSoonMovies];
  } catch (error) {
    return res.status(500).json({message: "Error fetching movies", error: error.message});
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
    movie = await NowShowing.findOne({ id: parseInt(id) });
    
    // If not found by numeric id and the id looks like a MongoDB ObjectId, try finding by _id
    if (!movie && mongoose.Types.ObjectId.isValid(id)) {
      movie = await NowShowing.findById(id);
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching movie", error: error.message });
  }

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ movie });
}

export const updateMovie = async(req, res, next) => {
  const id = req.params.id;
  const { title, description, releaseDate, image, wallpaper, rating, duration, genres } = req.body;

  let movie;
  try {
    movie = await NowShowing.findByIdAndUpdate(
      id,
      {
        title,
        image,
        wallpaper,
        rating,
        duration,
        releaseDate,
        genres,
        description,
      },
      { new: true }
    );
  } catch (error) {
    return res.status(500).json({ message: "Error updating movie", error: error.message });
  }

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ movie });
}

export const deleteMovie = async(req, res, next) => {
  const id = req.params.id;

  let movie;
  try {
    movie = await NowShowing.findByIdAndDelete(id);
  } catch (error) {
    return res.status(500).json({ message: "Error deleting movie", error: error.message });
  }

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ message: "Movie deleted successfully" });
}

export const toggleNowShowing = async(req, res, next) => {
  const id = req.params.id;
  const { nowShowing } = req.body;

  let movie;
  try {
    // First try to find the movie in ComingSoon collection
    movie = await ComingSoon.findById(id);
    
    if (movie) {
      // If movie is in ComingSoon and we want to make it NowShowing
      if (nowShowing) {
        const movieData = movie.toObject();
        await ComingSoon.findByIdAndDelete(id);
        movie = await NowShowing.create(movieData);
        movie.nowShowing = true;
        await movie.save();
      }
    } else {
      // If not in ComingSoon, try to find in NowShowing
      movie = await NowShowing.findById(id);
      
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      // If movie is in NowShowing and we want to make it ComingSoon
      if (!nowShowing) {
        const movieData = movie.toObject();
        await NowShowing.findByIdAndDelete(id);
        movie = await ComingSoon.create(movieData);
        movie.nowShowing = false;
        await movie.save();
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Error toggling movie status", error: error.message });
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
