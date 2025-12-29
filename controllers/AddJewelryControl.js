import AddJewelryModel from "../models/AddJewelry.js";

// Add Jewelry
export const AddJewelry = async (req, res) => {
  try {
    const { addJewelryTitle, addJewelryParagraph, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image || !addJewelryTitle || !addJewelryParagraph) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newJewelry = await AddJewelryModel.create({
      addJewelryTitle,
      addJewelryParagraph,
      imageJewelryURL: image,
      promotionPercentage: promotionPercentage || 0, // optional
    });

    res.status(201).json(newJewelry);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get All Jewelry
export const getAllJewelry = async (req, res) => {
  try {
    const allJewelry = await AddJewelryModel.find();
    res.status(200).json(allJewelry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Jewelry
export const updateJewelry = async (req, res) => {
  try {
    const { id } = req.params;
    const { addJewelryTitle, addJewelryParagraph, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedJewelry = await AddJewelryModel.findByIdAndUpdate(
      id,
      {
        ...(addJewelryTitle && { addJewelryTitle }),
        ...(addJewelryParagraph && { addJewelryParagraph }),
        ...(image && { imageJewelryURL: image }),
        ...(promotionPercentage !== undefined && { promotionPercentage }),
      },
      { new: true }
    );

    if (!updatedJewelry) {
      return res.status(404).json({ message: "Jewelry not found" });
    }

    res.status(200).json(updatedJewelry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Jewelry
export const deleteJewelry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJewelry = await AddJewelryModel.findByIdAndDelete(id);

    if (!deletedJewelry) {
      return res.status(404).json({ message: "Jewelry not found" });
    }

    res.status(200).json({ message: "Jewelry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Promotion Only
export const updateJewelryPromotion = async (req, res) => {
  try {
    const { jewelryId, promotion } = req.body;

    const jewelry = await AddJewelryModel.findById(jewelryId);
    if (!jewelry) return res.status(404).json({ message: "Jewelry not found" });

    jewelry.promotionPercentage = promotion;
    await jewelry.save();

    res.json({
      success: true,
      message: `Promotion updated to ${promotion}%`,
      promotionPercentage: jewelry.promotionPercentage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
