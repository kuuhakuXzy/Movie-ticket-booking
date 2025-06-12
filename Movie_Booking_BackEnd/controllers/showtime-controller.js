import Showtime from "../models/Showtime.js";
import Movie from "../models/Movie.js";

export const addShowtime = async (req, res) => {
  try {
    const { movieId, cinema, hall, date, startTime, endTime, price } = req.body;

    // Verify movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const showtime = new Showtime({
      movie: movieId,
      cinema,
      hall,
      date,
      startTime,
      endTime,
      price
    });

    await showtime.save();
    res.status(201).json({ showtime });
  } catch (error) {
    res.status(500).json({ message: "Error creating showtime", error: error.message });
  }
};

export const getShowtimes = async (req, res) => {
  try {
    const { movieId, date } = req.query;
    let query = {};

    if (movieId) {
      query.movie = movieId;
    }
    if (date) {
      query.date = new Date(date);
    }

    const showtimes = await Showtime.find(query)
      .populate('movie')
      .sort({ date: 1, startTime: 1 });

    res.status(200).json({ showtimes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching showtimes", error: error.message });
  }
};

export const deleteShowtime = async (req, res) => {
  try {
    const { id } = req.params;
    const showtime = await Showtime.findByIdAndDelete(id);
    
    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.status(200).json({ message: "Showtime deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting showtime", error: error.message });
  }
}; 