import Movie from "../models/Movie.js";
import Seat from "../models/Seat.js";
import Showtime from "../models/Showtime.js";

export const createShowtime = async (req, res) => {
  try {
    const { movieId, cinema, hall, date, startTime, endTime, price } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const showtime = new Showtime({ movie: movieId, cinema, hall, date, startTime, endTime, price });
    await showtime.save();

    console.log("Showtime created:", movie, cinema, hall, date, startTime, endTime, price);

    res.status(201).json({ showtime });
  } catch (error) {
    console.error("Create Showtime Error:", error);
    res.status(500).json({ message: "Error creating showtime", error: error.message });
  }
};


export const getAllShowtimes = async (req, res) => {
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

export const getShowtimeById = async (req, res) => {
  try {
    const { id } = req.params;
    const showtime = await Showtime.findById(id)
      .populate('movie')
      .populate('seats');

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.status(200).json({ showtime });
  } catch (error) {
    res.status(500).json({ message: "Error fetching showtime", error: error.message });
  }
};

export const updateShowtime = async (req, res) => {
  try {
    const { id } = req.params;
    const { cinema, hall, date, startTime, endTime, price } = req.body;

    const showtime = await Showtime.findByIdAndUpdate(
      id,
      {
        cinema,
        hall,
        date,
        startTime,
        endTime,
        price
      },
      { new: true }
    ).populate('movie');

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.status(200).json({ showtime });
  } catch (error) {
    res.status(500).json({ message: "Error updating showtime", error: error.message });
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

export const getShowtimesByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const showtimes = await Showtime.find({ movie: movieId })
      .populate('movie')
      .sort({ date: 1, startTime: 1 });

    res.status(200).json({ showtimes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching showtimes", error: error.message });
  }
};

export const getAvailableSeats = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First verify showtime exists
    const showtime = await Showtime.findById(id);
    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    // Get all seats for this showtime from the Seat model
    const seats = await Seat.find({ 
      showtime: id,
      isBooked: false 
    });

    res.status(200).json({ availableSeats: seats });
  } catch (error) {
    res.status(500).json({ message: "Error fetching available seats", error: error.message });
  }
};

export const updateSeatStatus = async (req, res) => {
  try {
    const { id, seatNumber } = req.params;
    const { isBooked } = req.body;

    const showtime = await Showtime.findById(id);
    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    const seat = await Seat.findOneAndUpdate(
      { showtime: id, seatNumber },
      { isBooked },
      { new: true }
    );

    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    res.status(200).json({ seat });
  } catch (error) {
    res.status(500).json({ message: "Error updating seat status", error: error.message });
  }
}; 