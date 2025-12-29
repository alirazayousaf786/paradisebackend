import express from "express";
import { 
  updatePromotion, 
  updateCategoryPromotion, 
  fixMissingPrices 
} from "../controllers/promotionController.js";

const router = express.Router();

// Fix missing prices (run this first if items don't have prices)
router.post("/promotion/fix-prices", fixMissingPrices);

// Apply promotion to all items in a category
router.post("/promotion/category", updateCategoryPromotion);

// Apply promotion to single item
router.put("/promotion/:category/:id", updatePromotion);

export default router;