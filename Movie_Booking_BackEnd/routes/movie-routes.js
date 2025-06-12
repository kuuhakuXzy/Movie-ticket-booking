import express from 'express';
import {addMovie,getMovies,getMovieById,getNowShowingMovies,getComingSoonMovies} from '../controllers/movie-controller.js'

const movieRouter = express.Router();

movieRouter.post("/",addMovie);
movieRouter.get("/now-showing",getNowShowingMovies);
movieRouter.get("/coming-soon",getComingSoonMovies);
movieRouter.get("/",getMovies);
movieRouter.get("/:id",getMovieById);

export default movieRouter;