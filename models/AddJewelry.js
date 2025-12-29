import mongoose from "mongoose";

const addJewelrySchema = new mongoose.Schema({
  imageJewelryURL: {
    type: String,
    required: true,
  },
  addJewelryTitle: {
    type: String,
    required: true,
  },
  addJewelryParagraph: {
    type: String,
    required: true,
  },
  promotionPercentage: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("addJewelry", addJewelrySchema);
