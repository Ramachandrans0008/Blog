import mongoose, { model, Schema } from "mongoose";

const Postscheme = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    author: { type: String, required: true },
    image: { type: String },
    createdAt: { type: String, default: Date.now },
    updateddAt: { type: String, default: Date.now },
  },
  {
    collection: "posts",
  }
);

// Create model
const postModel = model("post", Postscheme);

export default postModel;
