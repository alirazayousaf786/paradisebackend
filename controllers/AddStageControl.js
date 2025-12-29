import StageModel from "../models/AddStage.js";

// Add Stage
export const AddStage = async (req, res) => {
  try {
    const { addStageTitle, addStageParagraph, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image || !addStageTitle || !addStageParagraph) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newStage = await StageModel.create({
      addStageTitle,
      addStageParagraph,
      imageStageURL: image,
      promotionPercentage: promotionPercentage || 0, // optional
    });

    res.status(201).json(newStage);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get All Stage
export const getAllStage = async (req, res) => {
  try {
    const allStage = await StageModel.find();
    res.status(200).json(allStage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Stage
export const updateStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { addStageTitle, addStageParagraph, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedStage = await StageModel.findByIdAndUpdate(
      id,
      {
        ...(addStageTitle && { addStageTitle }),
        ...(addStageParagraph && { addStageParagraph }),
        ...(image && { imageStageURL: image }),
        ...(promotionPercentage !== undefined && { promotionPercentage }), // optional update
      },
      { new: true }
    );

    if (!updatedStage) {
      return res.status(404).json({ message: "Stage not found" });
    }

    res.status(200).json(updatedStage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Stage
export const deleteStage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStage = await StageModel.findByIdAndDelete(id);

    if (!deletedStage) {
      return res.status(404).json({ message: "Stage not found" });
    }

    res.status(200).json({ message: "Stage deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// New Endpoint: Update Promotion Only
export const updateStagePromotion = async (req, res) => {
  try {
    const { stageId, promotion } = req.body;

    const stage = await StageModel.findById(stageId);
    if (!stage) return res.status(404).json({ message: "Stage not found" });

    stage.promotionPercentage = promotion;
    await stage.save();

    res.json({
      success: true,
      message: `Promotion updated to ${promotion}%`,
      promotionPercentage: stage.promotionPercentage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};