import AddCarModel from "../models/AddCar.js";

// Add Car
export const AddCar = async (req, res) => {
  try {
    const { addCarTitle, addCarParagraph, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image || !addCarTitle || !addCarParagraph) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCar = await AddCarModel.create({
      addCarTitle,
      addCarParagraph,
      imageCarURL: image,
      promotionPercentage: promotionPercentage || 0, // optional
    });

    res.status(201).json(newCar);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get All Car
export const getAllCar = async (req, res) => {
  try {
    const allCar = await AddCarModel.find();
    res.status(200).json(allCar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Car
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { addCarTitle, addCarParagraph, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedCar = await AddCarModel.findByIdAndUpdate(
      id,
      {
        ...(addCarTitle && { addCarTitle }),
        ...(addCarParagraph && { addCarParagraph }),
        ...(image && { imageCarURL: image }),
        ...(promotionPercentage !== undefined && { promotionPercentage }), // optional update
      },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Car
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await AddCarModel.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// New Endpoint: Update Promotion Only
export const updateCarPromotion = async (req, res) => {
  try {
    const { carId, promotion } = req.body;

    const car = await AddCarModel.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    car.promotionPercentage = promotion;
    await car.save();

    res.json({
      success: true,
      message: `Promotion updated to ${promotion}%`,
      promotionPercentage: car.promotionPercentage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
