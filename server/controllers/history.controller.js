import History from "../models/history.model.js";

const addToHistory = async (req, res) => {
  try {
    const {
      mediaId,
      mediaType,
      title,
      poster,
      progress,
      episode,
      season,
      slug,
    } = req.body;
    const userId = req.user.id;
    const history = await History.findOneAndUpdate(
      { userId, mediaId, mediaType },
      {
        title,
        poster,
        slug,
        progress,
        episode,
        season,
        watchedAt: new Date(),
      },
      { upsert: true, new: true },
    );
    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await History.find({ userId });
    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromHistory = async (req, res) => {
  try {
    const { historyId } = req.params;
    const userId = req.user.id;
    const history = await History.findOneAndDelete({
      _id: historyId,
      userId,
    });
    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const clearHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await History.deleteMany({ userId });
    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  addToHistory,
  getHistory,
  removeFromHistory,
  clearHistory,
};
