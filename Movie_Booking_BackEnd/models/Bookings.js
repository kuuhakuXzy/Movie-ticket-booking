import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  showtime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Showtime",
    required: true
  },
  seats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat",
    required: true
  }],
  foodDrinks: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodDrink"
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  }
});

export default mongoose.model("Booking", bookingSchema);