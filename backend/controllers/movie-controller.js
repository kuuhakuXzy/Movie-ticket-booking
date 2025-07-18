import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import Admin from '../models/Admin.js';
import Movie, { ComingSoon, NowShowing } from "../models/Movie.js";
dotenv.config();

export const createMovie = async (req, res) => {
  try {
    const extractedToken = req.headers.authorization.split(' ')[1];
    
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token Not Found" })
    }

    let adminId;
    jwt.verify (extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
    if (err){
      return res.status(400).json({message: `${err.message}`})
    } else{
      adminId = decrypted.id;
      return;
    }
  });
    

    const { id, title, description, releaseDate, image, wallpaper, rating, duration, genres, nowShowing } = req.body;

    if (!image || !wallpaper) {
      return res.status(400).json({ message: "Image and wallpaper links are required" });
    }

    const formattedDate = new Date(releaseDate)

    const session = await mongoose.startSession();
    let movie;

    try {
      session.startTransaction();

      const adminUser = await Admin.findById(adminId);
      if (!adminUser) {
        await session.abortTransaction();
        return res.status(404).json({ message: "Admin not found" });
      }

      movie = new Movie({
        id,
        title,
        description,
        releaseDate: formattedDate,
        image,
        wallpaper,
        rating,
        duration,
        genres,
        nowShowing,
        admin: adminId,
      });

      await movie.save({ session });

      adminUser.addedmovies.push(movie);
      await adminUser.save({ session });

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      return res.status(500).json({ message: "Error creating movie", error: error.message });
    } finally {
      session.endSession();
    }

    return res.status(201).json({ movie });

  } catch (err) {
    console.error("Unhandled error in createMovie:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const toggleNowShowing = async(req, res, next) => {
  const id = req.params.id;
  const { isNowShowing } = req.body;

  let movie;
  try {
    movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (isNowShowing) {
      const nowShowing = new NowShowing(movie.toObject());
      await nowShowing.save();
      await ComingSoon.findOneAndDelete({ _id: id });
    } else {
      const comingSoon = new ComingSoon(movie.toObject());
      await comingSoon.save();
      await NowShowing.findOneAndDelete({ _id: id });
    }

    movie.isNowShowing = isNowShowing;
    await movie.save();
  } catch (error) {
    return res.status(500).json({ message: "Error toggling movie status", error: error.message });
  }

  return res.status(200).json({ movie });
}

export const getAllMovies = async (req, res) => {
  try {
    const { nowShowing } = req.query;

    let filter = {};
    if (nowShowing === "true") {
      filter.nowShowing = true;
    } else if (nowShowing === "false") {
      filter.nowShowing = false;
    }

    const movies = await Movie.find(filter);
    res.status(200).json({ movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Error fetching movies", error: error.message });
  }
};


export const getMovieById = async(req, res, next) => {
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

export const updateMovie = async(req, res, next) => {
  const id = req.params.id;
  const { title, description, releaseDate, posterUrl, featured, actors } = req.body;

  let movie;
  try {
    movie = await Movie.findByIdAndUpdate(
      id,
      {
        title,
        description,
        releaseDate: new Date(`${releaseDate}`),
        posterUrl,
        featured,
        actors
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
    movie = await Movie.findByIdAndDelete(id);
  } catch (error) {
    return res.status(500).json({ message: "Error deleting movie", error: error.message });
  }

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ message: "Movie deleted successfully" });
}

export const getNowShowingMovies = async(req, res, next) => {
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

export const getComingSoonMovies = async(req, res, next) => {
  let movies;
  try {
    movies = await ComingSoon.find();
  } catch (error) {
    return res.status(500).json({ message: "Error fetching coming soon movies", error: error.message });
  }
  if (!movies) {
    return res.status(404).json({message:"No movies found"})
  }
  return res.status(200).json({movies})
}
