import express from "express";
import userRoutes from "./user.route.js";
import reviewRoute from "./review.route.js";
import historyRoute from "./history.route.js";
const router = express.Router();
router.use("/user", userRoutes);
router.use("/reviews", reviewRoute);
router.use("/history", historyRoute);
export default router;
