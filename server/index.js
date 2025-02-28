import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/routes.js";
config();
const app = express();

// CORS phải được cấu hình TRƯỚC khi định nghĩa route
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

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
