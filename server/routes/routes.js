import express from "express";
import userRoutes from "./user.route.js";
import reviewRoute from "./review.route.js";
import historyRoute from "./history.route.js";
import chatRoute from "./chat.route.js"
const router = express.Router();
router.use("/user", userRoutes);
router.use("/reviews", reviewRoute);
router.use("/history", historyRoute);
router.use("/chat", chatRoute);
export default router;
