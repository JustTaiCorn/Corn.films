import express from "express";
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js";
import requestHandler from "../handlers/request.handler.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Get reviews của user hiện tại
router.get("/", verifyToken, reviewController.getReviewsOfUser);

// Get reviews theo mediaId - không cần đăng nhập cũng xem được
router.get("/media/:mediaId", reviewController.getReviewsByMediaId);

router.post(
  "/",
  verifyToken,
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId can not be empty"),
  body("content")
    .exists()
    .withMessage("content is required")
    .isLength({ min: 1 })
    .withMessage("content can not be empty"),
  body("mediaTitle").exists().withMessage("mediaTitle is required"),
  body("mediaPoster").exists().withMessage("mediaPoster is required"),
  requestHandler.validate,
  reviewController.create
);
router.delete("/:reviewId", verifyToken, reviewController.remove);
router.post("/like/:reviewId", verifyToken, reviewController.likeReview);
router.post("/dislike/:reviewId", verifyToken, reviewController.dislikeReview);
export default router;
