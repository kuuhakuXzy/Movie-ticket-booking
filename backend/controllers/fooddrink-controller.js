import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import FoodDrink from "../models/FoodDrink.js";
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

    await foodDrink.save();
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
}