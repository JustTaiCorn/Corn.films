import favoriteModel from "../models/favorite.model.js";

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    if (isFavorite)
      return res.status(200).json({
        success: true,
        data: isFavorite,
      });

    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id,
    });

    await favorite.save();

    res.status(201).json({
      success: true,
      data: favorite,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: favoriteId,
    });

    if (!favorite)
      return res.status(404).json({
        success: false,
        message: "Favorite not found",
      });

    await favoriteModel.deleteOne({ mediaId: favoriteId });

    res.status(200).json({
      success: true,
      message: "Favorite removed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFavoritesOfUser = async (req, res) => {
  try {
    const favorites = await favoriteModel
      .find({ user: req.user.id })
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      favorites: favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };
