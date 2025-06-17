import FoodDrink from "../models/FoodDrink.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
dotenv.config();

export const createFoodDrink = async (req, res) => {
  try {
    const extractedToken = req.headers.authorization.split(' ')[1];
    if(!extractedToken && extractedToken.trim() === ""){
      return res.status(404).json({message:"Token Not Found"})
    }

    let adminId;
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
      if(err){
        return res.status(400).json({message: `${err.message}`})
      }else{
        adminId = decrypted.id;
        return;
      }
    });

    const { name, description, price, category, image } = req.body;

    const foodDrink = new FoodDrink({
      name,
      description,
      price,
      category,
      image,
      admin: adminId
    });

    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await foodDrink.save({session});
    adminUser.addedFoodDrinks.push(foodDrink);
    await adminUser.save({session});
    await session.commitTransaction();

    res.status(201).json({ foodDrink });
  } catch (error) {
    res.status(500).json({ message: "Error creating food/drink item", error: error.message });
  }
};

export const getAllFoodDrinks = async (req, res) => {
  try {
    const { category } = req.query;
    let query = { isAvailable: true };

    if (category) {
      query.category = category;
    }

    const foodDrinks = await FoodDrink.find(query);
    res.status(200).json({ foodDrinks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching food/drink items", error: error.message });
  }
};

export const getFoodDrinkById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodDrink = await FoodDrink.findById(id);

    if (!foodDrink) {
      return res.status(404).json({ message: "Food/drink item not found" });
    }

    res.status(200).json({ foodDrink });
  } catch (error) {
    res.status(500).json({ message: "Error fetching food/drink item", error: error.message });
  }
};

export const updateFoodDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const foodDrink = await FoodDrink.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!foodDrink) {
      return res.status(404).json({ message: "Food/drink item not found" });
    }

    res.status(200).json({ foodDrink });
  } catch (error) {
    res.status(500).json({ message: "Error updating food/drink item", error: error.message });
  }
};

export const deleteFoodDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const foodDrink = await FoodDrink.findByIdAndDelete(id);

    if (!foodDrink) {
      return res.status(404).json({ message: "Food/drink item not found" });
    }

    res.status(200).json({ message: "Food/drink item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting food/drink item", error: error.message });
  }
};

export const getFoodDrinksByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const foodDrinks = await FoodDrink.find({ 
      category,
      isAvailable: true 
    });

    res.status(200).json({ foodDrinks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching food/drink items by category", error: error.message });
  }
};

export const toggleAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const foodDrink = await FoodDrink.findById(id);

    if (!foodDrink) {
      return res.status(404).json({ message: "Food/drink item not found" });
    }

    foodDrink.isAvailable = !foodDrink.isAvailable;
    await foodDrink.save();

    res.status(200).json({ foodDrink });
  } catch (error) {
    res.status(500).json({ message: "Error toggling food/drink availability", error: error.message });
  }
};