import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true
  },
  row: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true,
    enum: ['Standard', 'VIP']
  },
  price: {
    type: Number,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  showtime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Showtime',
    required: true
  }
});

export default mongoose.model('Seat', seatSchema); 