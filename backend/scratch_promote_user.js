import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import Role from "./models/role.model.js";

dotenv.config();

async function promote() {
  const email = process.argv[2];
  if (!email) {
    console.error("Please provide an email");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Find or create admin role
    let adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) {
      adminRole = await Role.create({ name: "admin" });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found");
      process.exit(1);
    }
    
    user.role = adminRole._id;
    await user.save();
    console.log(`Successfully promoted ${email} to admin!`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

promote();
