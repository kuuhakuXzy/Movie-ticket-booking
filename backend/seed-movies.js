import mongoose from "mongoose";
import { NowShowing, ComingSoon } from "./models/Movie.js";

// Connect to MongoDB
mongoose.connect("mongodb+srv://thnmzhlakshmanan:8YR7szcw3GeAUeOs@cluster0.hobpt4z.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed function
async function seedMovies() {
  try {
    // Create test now showing movies
    const nowShowingMovies = [
      {
        id: 1,
        title: "Now Showing Movie 1",
        image: "now-showing-1.jpg",
        wallpaper: "now-showing-wallpaper-1.jpg",
        rating: "PG-13",
        duration: "120",
        releaseDate: new Date(),
        genres: ["Action", "Comedy"],
        description: "A now showing movie description 1",
        admin: new mongoose.Types.ObjectId("680c9870dc1c8a8787d18474"), // Replace with a valid admin ID
      },
      {
        id: 2,
        title: "Now Showing Movie 2",
        image: "now-showing-2.jpg",
        wallpaper: "now-showing-wallpaper-2.jpg",
        rating: "R",
        duration: "150",
        releaseDate: new Date(),
        genres: ["Drama", "Thriller"],
        description: "A now showing movie description 2",
        admin: new mongoose.Types.ObjectId("680c9870dc1c8a8787d18474"), // Replace with a valid admin ID
      },
    ];

    // Create test coming soon movies
    const comingSoonMovies = [
      {
        id: 3,
        title: "Coming Soon Movie 1",
        image: "coming-soon-1.jpg",
        wallpaper: "coming-soon-wallpaper-1.jpg",
        rating: "G",
        duration: "90",
        releaseDate: new Date(),
        genres: ["Family", "Adventure"],
        description: "A coming soon movie description 1",
        admin: new mongoose.Types.ObjectId("680c9870dc1c8a8787d18474"), // Replace with a valid admin ID
      },
      {
        id: 4,
        title: "Coming Soon Movie 2",
        image: "coming-soon-2.jpg",
        wallpaper: "coming-soon-wallpaper-2.jpg",
        rating: "PG",
        duration: "110",
        releaseDate: new Date(),
        genres: ["Sci-Fi", "Fantasy"],
        description: "A coming soon movie description 2",
        admin: new mongoose.Types.ObjectId("680c9870dc1c8a8787d18474"), // Replace with a valid admin ID
      },
    ];

    // Save now showing movies
    await NowShowing.insertMany(nowShowingMovies);
    console.log("Now showing movies seeded successfully!");

    // Save coming soon movies
    await ComingSoon.insertMany(comingSoonMovies);
    console.log("Coming soon movies seeded successfully!");

  } catch (error) {
    console.error("Error seeding movies:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

// Run the seed function
seedMovies();