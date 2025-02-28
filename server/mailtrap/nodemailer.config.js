import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Tạo transporter với Gmail
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Nên dùng App Password
  },
});

export const sender = {
  email: process.env.EMAIL_USER,
  name: "Pop Corn Films",
};
