import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedAdmin() {
  try {
    // Create new admin with specific ID
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new Admin({
      _id: new mongoose.Types.ObjectId("680c9870dc1c8a8787d18474"), // Using the ID from your error message
      email: "admin@example.com",
      password: hashedPassword
    });

    // Remove existing admin if exists
    await Admin.deleteOne({ _id: admin._id });
    
    // Save new admin
    await admin.save();
    console.log("Admin created successfully with ID:", admin._id);
    
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedAdmin(); 