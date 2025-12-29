import AddCakeModel from "../models/AddCack.js";

// Add Cake
export const addCake = async (req, res) => {
  try {
    const { addCakeTitle, addCakeDescription, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image || !addCakeTitle || !addCakeDescription) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCake = await AddCakeModel.create({
      addCakeTitle,
      addCakeDescription,
      imageCakeURL: image,
      promotionPercentage: promotionPercentage || 0,
    });

    res.status(201).json(newCake);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get All Cakes
export const getAllCakes = async (req, res) => {
  try {
    const allCakes = await AddCakeModel.find();
    res.status(200).json(allCakes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Cake
export const updateCake = async (req, res) => {
  try {
    const { id } = req.params;
    const { addCakeTitle, addCakeDescription, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedCake = await AddCakeModel.findByIdAndUpdate(
      id,
      {
        ...(addCakeTitle && { addCakeTitle }),
        ...(addCakeDescription && { addCakeDescription }),
        ...(image && { imageCakeURL: image }),
        ...(promotionPercentage !== undefined && { promotionPercentage }),
      },
      { new: true }
    );

    if (!updatedCake) {
      return res.status(404).json({ message: "Cake not found" });
    }

    res.status(200).json(updatedCake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Cake
export const deleteCake = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCake = await AddCakeModel.findByIdAndDelete(id);

    if (!deletedCake) {
      return res.status(404).json({ message: "Cake not found" });
    }

    res.status(200).json({ message: "Cake deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Cake Promotion Only
export const updateCakePromotion = async (req, res) => {
  try {
    const { cakeId, promotion } = req.body;

    const cake = await AddCakeModel.findById(cakeId);
    if (!cake) {
      return res.status(404).json({ message: "Cake not found" });
    }

    cake.promotionPercentage = promotion;
    await cake.save();

    res.json({
      success: true,
      message: `Promotion updated to ${promotion}%`,
      promotionPercentage: cake.promotionPercentage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
