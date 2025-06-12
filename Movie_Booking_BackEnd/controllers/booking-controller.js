import mongoose from "mongoose";
import Booking from "../models/Bookings.js";
import Showtime from "../models/Showtime.js";
import Seat from "../models/Seat.js";
import FoodDrink from "../models/FoodDrink.js";
import User from "../models/User.js";

export const createBooking = async (req, res) => {
  try {
    const { showtimeId, seatIds, foodDrinks, userId } = req.body;

    // Verify showtime exists
    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    // Verify seats are available
    const seats = await Seat.find({ _id: { $in: seatIds } });
    if (seats.length !== seatIds.length) {
      return res.status(400).json({ message: "Some seats are not available" });
    }

    // Calculate total amount
    let totalAmount = 0;
    
    // Add seat prices
    seats.forEach(seat => {
      totalAmount += seat.price;
    });

    // Add food and drinks prices
    if (foodDrinks && foodDrinks.length > 0) {
      const foodDrinkItems = await FoodDrink.find({
        _id: { $in: foodDrinks.map(item => item.item) }
      });

      foodDrinks.forEach(order => {
        const item = foodDrinkItems.find(fd => fd._id.toString() === order.item);
        if (item) {
          totalAmount += item.price * order.quantity;
        }
      });
    }

    // Create booking
    const booking = new Booking({
      user: userId,
      showtime: showtimeId,
      seats: seatIds,
      foodDrinks,
      totalAmount,
      status: 'pending',
      paymentStatus: 'pending'
    });

    await booking.save();

    // Update seat status
    await Seat.updateMany(
      { _id: { $in: seatIds } },
      { $set: { isBooked: true } }
    );

    res.status(201).json({ booking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId })
      .populate('showtime')
      .populate('seats')
      .populate({
        path: 'foodDrinks.item',
        model: 'FoodDrink'
      })
      .sort({ bookingDate: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only allow cancellation of pending or confirmed bookings
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Release seats
    await Seat.updateMany(
      { _id: { $in: booking.seats } },
      { $set: { isBooked: false } }
    );

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking", error: error.message });
  }
};

export const getBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
      .populate('showtime')
      .populate('seats')
      .populate({
        path: 'foodDrinks.item',
        model: 'FoodDrink'
      });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking details", error: error.message });
  }
};

export const newBookings = async(req, res, next)=>{
  
  const {movie, date, seatNumber, user} = req.body;

  // if(!movie && movie.trim() === "" &&
  //  !date && date.trim() === "" &&
  //  !seatNumber && seatNumber === "" &&
  //  !user && user === "" ){
  //   return res.status(422).json({message:"Invalid inputs"})
  //  }

  let existingMovies;
  let existingUser;

  try {
    existingMovies = await Movie.findById(movie);
    existingUser = await User.findById(user);
    
  } catch (error) {
    return console.log(error)
  }

  if(!existingMovies){
    return res.status(404).json({message: "Movie Not Found with given ID"})
  }
  if(!user){
    return res.status(404).json({message: "User Not Found with given ID"})
  }

   let booking;
   try {
    
    booking = new Booking({movie, date:new Date(`${date}`), seatNumber, user})

    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovies.bookings.push(booking);
    await existingUser.save({session});
    await existingMovies.save({session});
    await booking.save({session})
    session.commitTransaction();

   } catch (error) {
    return console.log(error)
   }

   if(!booking){
    return res.status(500).json({message:"Unable to create booking"});
   }

   return res.status(201).json({ booking })

}

export const getBookingById = async (req, res, next)=>{
  let id = req.params.id;
  let booking;
  try {
    booking = await Booking.findById(id);
    
  } catch (error) {
    return console.log(error)
  }

  if(!booking){
    return res.status(500).json("Unexpected Error");
  }
  return res.status(200).json({booking});
}

export const deleteBooking = async (req, res, next)=>{
  let id = req.params.id
  let booking;
  try {

    booking = await Booking.findByIdAndDelete(id).populate("user movie")
    //console.log(booking);

    const session = await mongoose.startSession();
    session.startTransaction();
    //const newData =[]
   // const dum = await booking.user.bookings.filter((ele)=> ele.equals(booking._id) );
    //const dum1 = await booking.movie.bookings.filter((ele)=> ele.equals(booking._id) );
   // console.log(dum)
    //console.log(dum1)
  //  newData.push(dum)
    //booking.user.bookings = newData;
//await User.findById()
     await booking.user.bookings.pull(booking);
     await booking.movie.bookings.pull(booking);
    await booking.user.save({session});
    await booking.movie.save({ session })

    session.commitTransaction();
    
  } catch (error) {
    return console.log(error)
  }
  if(!booking){
    return res.status(500).json({message:"Given Id not delated"})
  }

  return res.status(200).json({message:"Booking deleted successfully!"})
}