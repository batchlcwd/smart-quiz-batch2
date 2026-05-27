import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
      maxLength: [50, "Name should be less than 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
      index: true,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
      trim: true,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: [true, "Role is required"],
    },
  },
  {
    timestamps: true,
  }
);

//more logics comes here

const User = mongoose.model("User", userSchema);
export default User;
