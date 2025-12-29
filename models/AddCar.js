// import mongoose from "mongoose";
import  mongoose  from "mongoose";
const addCarSchema = new mongoose.Schema({
  imageCarURL: { type: String, required: true },
  addCarTitle: { type: String, required: true },
  addCarParagraph: { type: String, required: true },
  promotionPercentage: { type: Number, default: 0 },

  // Optional: Promotion percentage for cars
  promotionPercentage: {
    type: Number,
    default: 0
  },
});

export default mongoose.model("addCar", addCarSchema);
