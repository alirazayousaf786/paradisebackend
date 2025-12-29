import mongoose from "mongoose";

const stageSchema = new mongoose.Schema({
  imageStageURL: { type: String, required: true },      
  addStageTitle: { type: String, required: true },      
  addStageParagraph: { type: String, required: true },  
  promotionPercentage: { type: Number, default: 0 },
});

export default mongoose.model("Stage", stageSchema);