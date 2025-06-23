import mongoose from "mongoose";
import FoodDrink from "./models/FoodDrink.js";
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed function
async function seedFoodDrinks() {
  try {
    const foodDrinks = [
      {
        name: "Popcorn (Small)",
        description: "Freshly popped popcorn in a small container",
        price: 5.99,
        category: "Food",
        image: "popcorn-small.jpg",
        isAvailable: true
      },
      {
        name: "Popcorn (Medium)",
        description: "Freshly popped popcorn in a medium container",
        price: 7.99,
        category: "Food",
        image: "popcorn-medium.jpg",
        isAvailable: true
      },
      {
        name: "Popcorn (Large)",
        description: "Freshly popped popcorn in a large container",
        price: 9.99,
        category: "Food",
        image: "popcorn-large.jpg",
        isAvailable: true
      },
      {
        name: "Nachos",
        description: "Crispy nachos with cheese sauce",
        price: 8.99,
        category: "Food",
        image: "nachos.jpg",
        isAvailable: true
      },
      {
        name: "Hot Dog",
        description: "Classic hot dog with ketchup and mustard",
        price: 6.99,
        category: "Food",
        image: "hotdog.jpg",
        isAvailable: true
      },
      {
        name: "Coca Cola",
        description: "Regular Coca Cola",
        price: 3.99,
        category: "Drink",
        image: "coca-cola.jpg",
        isAvailable: true
      },
      {
        name: "Sprite",
        description: "Regular Sprite",
        price: 3.99,
        category: "Drink",
        image: "sprite.jpg",
        isAvailable: true
      },
      {
        name: "Mineral Water",
        description: "500ml mineral water",
        price: 2.99,
        category: "Drink",
        image: "water.jpg",
        isAvailable: true
      },
      {
        name: "Movie Combo 1",
        description: "Medium Popcorn + Coca Cola",
        price: 12.99,
        category: "Combo",
        image: "combo1.jpg",
        isAvailable: true
      },
      {
        name: "Movie Combo 2",
        description: "Large Popcorn + 2 Coca Colas",
        price: 16.99,
        category: "Combo",
        image: "combo2.jpg",
        isAvailable: true
      }
    ];

    await FoodDrink.insertMany(foodDrinks);
    console.log("Food and drinks seeded successfully!");

  } catch (error) {
    console.error("Error seeding food and drinks:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

// Run the seed function
seedFoodDrinks(); 