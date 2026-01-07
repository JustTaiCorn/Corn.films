import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: false, // Not required for Google auth users
      default: "",
    },
    username: {
      type: String,
      required: true,
    },
    googleAuth: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  modelOptions
);

export const User = mongoose.model("User", userSchema);
