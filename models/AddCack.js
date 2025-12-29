import mongoose from "mongoose";

const addCakeSchema = new mongoose.Schema(
  {
    imageCakeURL: {
      type: String,
      required: true,
    },
    addCakeTitle: {
      type: String,
      required: true,
    },
    addCakeDescription: {
      type: String,
      required: true,
    },
    promotionPercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AddCake", addCakeSchema);
