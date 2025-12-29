// import mongoose from "mongoose";
import  mongoose  from "mongoose";
const addBirthdaySchema = new mongoose.Schema({
  imageBirthdayURL: { type: String, required: true },
  addBirthdayTitle: { type: String, required: true },
  addBirthdayParagraph: { type: String, required: true },
  promotionPercentage: { type: Number, default: 0 },

  // Optional: Promotion percentage for birthdays
  promotionPercentage: {
    type: Number,
    default: 0
  },
});

export default mongoose.model("addBirthday", addBirthdaySchema);
