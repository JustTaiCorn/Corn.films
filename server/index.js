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
  "http://localhost:5173",
  "https://popcornflims.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
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
app.get('/ms', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send('ms');});
app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to MongoDB");
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
