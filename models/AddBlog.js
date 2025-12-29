

import mongoose from "mongoose";

const addBlogSchema = new mongoose.Schema({
  imageBlogURL: { type: String, required: true },
  addBlogTitle: { type: String, required: true },
  addBlogParagraph: { type: String, required: true },
  promotionPercentage: { type: Number, default: 0 },
  promotionPercentage: {
    type: Number,
    default: 0
  },
});

export default mongoose.model("addBlog", addBlogSchema);
