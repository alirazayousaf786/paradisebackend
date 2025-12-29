// import mongoose from "mongoose";
import  mongoose  from "mongoose";
const addMesairiSchema = new mongoose.Schema({
  imageMesairiURL: { type: String, required: true },
  addMesairiTitle: { type: String, required: true },
  addMesairiParagraph: { type: String, required: true },
  promotionPercentage: { type: Number, default: 0 },

  // Optional: Promotion percentage for Mesairi
  promotionPercentage: {
    type: Number,
    default: 0
  },
});

export default mongoose.model("addMesairi", addMesairiSchema);
