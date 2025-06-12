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
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  genres: {
    type: [String],
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

// Create the base Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Create NowShowing model that extends Movie schema
const NowShowing = mongoose.model('NowShowing', movieSchema);

// Create ComingSoon model that extends Movie schema
const ComingSoon = mongoose.model('ComingSoon', movieSchema);

export { Movie as default, NowShowing, ComingSoon };