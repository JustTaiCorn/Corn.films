import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/routes.js";
config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Frontend local khi phát triển
  "https://popcornflims.netlify.app", // Frontend trên Netlify (production)
];

// Cấu hình CORS cho nhiều origins
app.use(
  cors({
    origin: function (origin, callback) {
      // Kiểm tra xem origin có trong danh sách allowedOrigins không
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to MongoDB");
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
