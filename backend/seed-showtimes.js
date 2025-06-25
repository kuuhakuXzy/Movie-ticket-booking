import mongoose from "mongoose";
import Showtime from "./models/Showtime.js";
import Seat from "./models/Seat.js";
import { NowShowing } from "./models/Movie.js";
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to create seats for a showtime
async function createSeats(showtimeId, hallNumber) {
  const seats = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const areas = ['Standard', 'VIP'];
  
  for (let row of rows) {
    for (let seatNum = 1; seatNum <= 10; seatNum++) {
      const area = row === 'A' || row === 'B' ? 'VIP' : 'Standard';
      const price = area === 'VIP' ? 15 : 10;
      
      seats.push({
        seatNumber: `${row}${seatNum}`,
        row: row,
        area: area,
        price: price,
        isBooked: false,
        showtime: showtimeId
      });
    }
  }
  
  return await Seat.insertMany(seats);
}

// Seed function
async function seedShowtimes() {
  try {
    // Get a movie from the database
    const movie = await NowShowing.findOne();
    if (!movie) {
      console.error("No movies found in the database. Please seed movies first.");
      return;
    }

    // Create showtimes for the next 7 days
    const showtimes = [];
    const halls = ['Hall 1', 'Hall 2', 'Hall 3'];
    const timeSlots = ['10:00', '13:00', '16:00', '19:00', '22:00'];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      for (let hall of halls) {
        for (let time of timeSlots) {
          const endTime = new Date(`2000-01-01T${time}`);
          endTime.setHours(endTime.getHours() + 2); // Assuming 2-hour movies
          
          showtimes.push({
            movie: movie._id,
            cinema: "Main Cinema",
            hall: hall,
            date: date,
            startTime: time,
            endTime: endTime.toTimeString().slice(0, 5),
            price: 10,
            isActive: true
          });
        }
      }
    }

    // Save showtimes
    const savedShowtimes = await Showtime.insertMany(showtimes);
    console.log("Showtimes seeded successfully!");

    // Create seats for each showtime
    for (let showtime of savedShowtimes) {
      const seats = await createSeats(showtime._id, showtime.hall);
      console.log(`Created ${seats.length} seats for showtime ${showtime._id}`);
    }

    console.log("All data seeded successfully!");

  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

// Run the seed function
seedShowtimes(); 