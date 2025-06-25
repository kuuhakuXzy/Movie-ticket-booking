import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const createUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");

        // Check if user already exists
        const existingUser = await User.findOne({ email: "test@example.com" });
        if (existingUser) {
            console.log("User already exists");
            process.exit(0);
        }

        // Create new user
        const hashedPassword = bcrypt.hashSync("password123");
        const user = new User({
            name: "Test User",
            email: "test@example.com",
            password: hashedPassword
        });

        await user.save();
        console.log("User created successfully:", user);
        process.exit(0);
    } catch (error) {
        console.error("Error creating user:", error);
        process.exit(1);
    }
};

createUser(); 