import AddMesairiModel from "../models/AddMesairi.js";

// Add Mesairi
export const AddMesairi = async (req, res) => {
  try {
    const { addMesairiTitle, addMesairiParagraph, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image || !addMesairiTitle || !addMesairiParagraph) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMesairi = await AddMesairiModel.create({
      addMesairiTitle,
      addMesairiParagraph,
      imageMesairiURL: image,
      promotionPercentage: promotionPercentage || 0, // optional
    });

    res.status(201).json(newMesairi);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get All Mesairi
export const getAllMesairi = async (req, res) => {
  try {
    const allMesairi = await AddMesairiModel.find();
    res.status(200).json(allMesairi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Mesairi
export const updateMesairi = async (req, res) => {
  try {
    const { id } = req.params;
    const { addMesairiTitle, addMesairiParagraph, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedMesairi = await AddMesairiModel.findByIdAndUpdate(
      id,
      {
        ...(addMesairiTitle && { addMesairiTitle }),
        ...(addMesairiParagraph && { addMesairiParagraph }),
        ...(image && { imageMesairiURL: image }),
        ...(promotionPercentage !== undefined && { promotionPercentage }), // optional update
      },
      { new: true }
    );

    if (!updatedMesairi) {
      return res.status(404).json({ message: "Mesairi not found" });
    }

    res.status(200).json(updatedMesairi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Mesairi
export const deleteMesairi = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMesairi = await AddMesairiModel.findByIdAndDelete(id);

    if (!deletedMesairi) {
      return res.status(404).json({ message: "Mesairi not found" });
    }

    res.status(200).json({ message: "Mesairi deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// New Endpoint: Update Promotion Only
export const updateMesairiPromotion = async (req, res) => {
  try {
    const { mesairiId, promotion } = req.body;

    const mesairi = await AddMesairiModel.findById(mesairiId);
    if (!mesairi) return res.status(404).json({ message: "Mesairi not found" });

    mesairi.promotionPercentage = promotion;
    await mesairi.save();

    res.json({
      success: true,
      message: `Promotion updated to ${promotion}%`,
      promotionPercentage: mesairi.promotionPercentage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
