import reviewModel from "../models/review.model.js";

const create = async (req, res) => {
  try {
    // Make sure we have user.id from the token
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const review = new reviewModel({
      user: req.user.id, // Changed from req.userid to req.user.id
      ...req.body,
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

    const reviews = await reviewModel
      .find({ mediaId })
      .populate({
        path: "user",
        select: "username",
      })
      .sort("-createdAt");

    console.log("Found reviews:", reviews); // Add this for debugging

    res.status(200).json({
      success: true,
      results: reviews,
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
        select: "username", // Chỉ lấy username
      })
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      results: reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default { create, remove, getReviewsOfUser, getReviewsByMediaId };
