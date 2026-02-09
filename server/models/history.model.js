import mongoose from "mongoose";
import { Schema } from "mongoose";

const historySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mediaId: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
  },
  title: String,
  poster: String,
  watchedAt: {
    type: Date,
    default: Date.now,
  },
  episode: Number,
  season: Number,
  progress: {
    type: Number,
    default: 0,
  },
});
historySchema.index({ userId: 1, mediaId: 1 }, { unique: true });
export default mongoose.model("History", historySchema);
