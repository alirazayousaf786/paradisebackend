import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
  category: { type: String, required: true }, // blog, birthday, car, mesairi
  percentage: { type: Number, required: true }, // 10, 20 etc
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Promotion", promotionSchema);
