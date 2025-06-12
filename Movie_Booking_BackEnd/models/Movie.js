import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  wallpaper: {
    type: String,
    required: true
  },
  rating: {
    type: String, // or Number if you want numeric ratings
    required: true
  },
  duration: {
    type: String, // or Number if you want duration in minutes
    required: true
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  genres: {
    type: [String], // Array of strings for multiple genres
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  nowShowing: {
    type: Boolean,
    default: false
  },
  showtimes: [{
    type: mongoose.Types.ObjectId,
    ref: "Showtime"
  }],
  bookings: [{
    type: mongoose.Types.ObjectId,
    ref: "Booking"
  }],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true
  }
}, {
  timestamps: true
});

const NowShowing = mongoose.model("NowShowing", movieSchema, "now_showing_movies");
const ComingSoon = mongoose.model("ComingSoon", movieSchema, "coming_soon_movies");

export { NowShowing, ComingSoon };

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;