import express from "express";
import userRoutes from "./user.route.js";
import reviewRoute from "./review.route.js";
const router = express.Router();
router.use("/user", userRoutes);
router.use("/reviews", reviewRoute);
export default router;
