import AddBirthdayModel from "../models/AddBridthday.js";

// Add Birthday
export const AddBirthday = async (req, res) => {
  try {
    const { addBirthdayTitle, addBirthdayParagraph, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image || !addBirthdayTitle || !addBirthdayParagraph) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBirthday = await AddBirthdayModel.create({
      addBirthdayTitle,
      addBirthdayParagraph,
      imageBirthdayURL: image,
      promotionPercentage: promotionPercentage || 0, // optional
    });

    res.status(201).json(newBirthday);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get All Birthday
export const getAllBirthday = async (req, res) => {
  try {
    const allBirthday = await AddBirthdayModel.find();
    res.status(200).json(allBirthday);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Birthday
export const updateBirthday = async (req, res) => {
  try {
    const { id } = req.params;
    const { addBirthdayTitle, addBirthdayParagraph, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedBirthday = await AddBirthdayModel.findByIdAndUpdate(
      id,
      {
        ...(addBirthdayTitle && { addBirthdayTitle }),
        ...(addBirthdayParagraph && { addBirthdayParagraph }),
        ...(image && { imageBirthdayURL: image }),
        ...(promotionPercentage !== undefined && { promotionPercentage }), // optional update
      },
      { new: true }
    );

    if (!updatedBirthday) {
      return res.status(404).json({ message: "Birthday not found" });
    }

    res.status(200).json(updatedBirthday);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Birthday
export const deleteBirthday = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBirthday = await AddBirthdayModel.findByIdAndDelete(id);

    if (!deletedBirthday) {
      return res.status(404).json({ message: "Birthday not found" });
    }

    res.status(200).json({ message: "Birthday deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// New Endpoint: Update Promotion Only
export const updateBirthdayPromotion = async (req, res) => {
  try {
    const { birthdayId, promotion } = req.body;

    const birthday = await AddBirthdayModel.findById(birthdayId);
    if (!birthday) return res.status(404).json({ message: "Birthday not found" });

    birthday.promotionPercentage = promotion;
    await birthday.save();

    res.json({
      success: true,
      message: `Promotion updated to ${promotion}%`,
      promotionPercentage: birthday.promotionPercentage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
