import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Review",
  mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      mediaId: {
        type: String,
        required: true,
      },
      mediaTitle: {
        type: String,
        required: true,
      },
      mediaPoster: {
        type: String,
        required: true,
      },
      mediaSlug: {
        type: String,
        required: true,
      },
      likes: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      dislikes: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      replies: [
        {
          type: Schema.Types.ObjectId,
          ref: "Review",
        },
      ],
    },
    modelOptions
  )
);
