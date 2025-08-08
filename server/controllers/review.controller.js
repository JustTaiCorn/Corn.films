import reviewModel from "../models/review.model.js";

const create = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const review = new reviewModel({
      user: req.user.id,
      ...req.body,
      likes: [],
      dislikes: [],
      replies: [],
    });

    await review.save();

    const populatedReview = await reviewModel.findById(review._id).populate({
      path: "user",
      select: "username",
    });

    res.status(201).json({
      success: true,
      ...populatedReview._doc,
      id: populatedReview.id,
    });
  } catch (error) {
    console.error("Review creation error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id,
    });

    if (!review)
      return res.status(404).json({
        success: false,
        message: "Review not found or you don't have permission",
      });

    await reviewModel.deleteOne({ _id: reviewId });

    res.status(200).json({
      success: true,
      message: "Review removed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Thêm endpoint để lấy reviews theo mediaId
const getReviewsByMediaId = async (req, res) => {
  try {
    const { mediaId } = req.params;
    console.log("mediaId:", mediaId);

    // First, find all reviews for this media
    const allReviews = await reviewModel
      .find({
        mediaId,
      })
      .populate({
        path: "user",
        select: "username",
      })
      .populate({
        path: "replies",
        populate: {
          path: "user",
          select: "username",
        },
      })
      .sort("-createdAt");

    // Then collect all replies IDs to filter them out from top-level reviews
    const replyIds = new Set();
    allReviews.forEach((review) => {
      if (review.replies && review.replies.length > 0) {
        review.replies.forEach((reply) => {
          if (reply && reply._id) {
            replyIds.add(reply._id.toString());
          }
        });
      }
    });

    // Filter out reviews that are actually replies to other reviews
    const topLevelReviews = allReviews.filter(
      (review) => !replyIds.has(review._id.toString())
    );

    res.status(200).json({
      success: true,
      results: topLevelReviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({
        user: req.user.id,
      })
      .populate({
        path: "user",
        select: "username",
      })
      .populate({
        path: "replies",
        populate: { path: "user", select: "username" },
      })
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      reviews: reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const likeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const review = await reviewModel.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const hasLiked = review.likes.includes(userId);
    const hasDisliked = review.dislikes.includes(userId);

    if (hasLiked) {
      review.likes = review.likes.filter((id) => id.toString() !== userId);
    } else {
      review.likes.push(userId);
      if (hasDisliked) {
        review.dislikes = review.dislikes.filter(
          (id) => id.toString() !== userId
        );
      }
    }

    await review.save();

    res.status(200).json({
      success: true,
      likes: review.likes.length,
      dislikes: review.dislikes.length,
    });
  } catch (error) {
    console.error("Like review error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const dislikeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const review = await reviewModel.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const hasDisliked = review.dislikes.includes(userId);
    const hasLiked = review.likes.includes(userId);

    if (hasDisliked) {
      review.dislikes = review.dislikes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      review.dislikes.push(userId);
      if (hasLiked) {
        review.likes = review.likes.filter((id) => id.toString() !== userId);
      }
    }

    await review.save();

    res.status(200).json({
      success: true,
      likes: review.likes.length,
      dislikes: review.dislikes.length,
    });
  } catch (error) {
    console.error("Dislike review error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default {
  create,
  remove,
  getReviewsOfUser,
  getReviewsByMediaId,
  likeReview,
  dislikeReview,
};
