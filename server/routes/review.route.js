import express from "express";
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js";
import requestHandler from "../handlers/request.handler.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Get reviews của user hiện tại
router.get("/", verifyToken, reviewController.getReviewsOfUser);
router.get("/media/:mediaId", reviewController.getReviewsByMediaId);

router.post(
  "/",
  verifyToken,
  requestHandler.validate,
  reviewController.create
);
router.delete("/:reviewId", verifyToken, reviewController.remove);
router.post("/like/:reviewId", verifyToken, reviewController.likeReview);
router.post("/dislike/:reviewId", verifyToken, reviewController.dislikeReview);
export default router;
