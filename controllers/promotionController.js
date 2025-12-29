// controllers/promotionController.js
import AddBlog from "../models/AddBlog.js";
import AddBridthday from "../models/AddBridthday.js";
import AddCar from "../models/AddCar.js";
import AddMesairi from "../models/AddMesairi.js";

const MODEL_MAP = {
  blog: AddBlog,
  birthday: AddBridthday,
  car: AddCar,
  mesairi: AddMesairi,
};

// Fix missing prices (run once for each category)
export const fixMissingPrices = async (req, res) => {
  try {
    const { category, defaultPrice } = req.body;

    console.log("🔧 Fixing prices for category:", category);

    if (!category || !defaultPrice) {
      return res.status(400).json({ 
        success: false,
        message: "Category and defaultPrice are required" 
      });
    }

    const Model = MODEL_MAP[category];
    
    if (!Model) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid category. Valid options: blog, birthday, car, mesairi" 
      });
    }

    // Get all items
    const items = await Model.find();
    
    if (items.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No items found in ${category} category`
      });
    }

    let fixedCount = 0;
    for (let item of items) {
      // Check if price is missing, 0, or null
      if (!item.price || item.price === 0 || item.price === null) {
        item.price = parseFloat(defaultPrice);
        item.discountedPrice = parseFloat(defaultPrice);
        item.promotionPercentage = 0;
        await item.save();
        fixedCount++;
        console.log(`✅ Fixed item ${item._id} - Set price to $${item.price}`);
      } else {
        console.log(`⏭️ Skipped item ${item._id} - Already has price $${item.price}`);
      }
    }

    console.log(`🎉 Total fixed: ${fixedCount} items out of ${items.length}`);

    res.status(200).json({
      success: true,
      message: `Fixed ${fixedCount} items with default price $${defaultPrice}`,
      details: {
        totalItems: items.length,
        fixedCount: fixedCount,
        skippedCount: items.length - fixedCount,
        defaultPrice: defaultPrice
      }
    });
  } catch (err) {
    console.error("❌ Error fixing prices:", err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Update all items in a category with promotion
export const updateCategoryPromotion = async (req, res) => {
  try {
    const { category, percentage } = req.body;

    console.log("📩 Received promotion request:", { category, percentage });

    if (!category || percentage === undefined) {
      return res.status(400).json({ 
        success: false,
        message: "Category and percentage are required" 
      });
    }

    const Model = MODEL_MAP[category];
    
    if (!Model) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid category. Valid options: blog, birthday, car, mesairi" 
      });
    }

    // Get all items in the category
    const items = await Model.find();

    if (items.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No items found in ${category} category`
      });
    }

    // Update each item with promotion and calculate discounted price
    let updatedCount = 0;
    let itemsWithoutPrice = 0;
    let itemsWithPrice = 0;

    for (let item of items) {
      item.promotionPercentage = percentage;
      
      // Calculate discounted price if item has a price
      if (item.price && item.price > 0) {
        const discount = (item.price * percentage) / 100;
        item.discountedPrice = item.price - discount;
        itemsWithPrice++;
        
        console.log(`💰 Item: ${item.addMesairiTitle || item.title || item.name || 'Unknown'}`);
        console.log(`   Original Price: $${item.price.toFixed(2)}`);
        console.log(`   Discount: ${percentage}% (-$${discount.toFixed(2)})`);
        console.log(`   Final Price: $${item.discountedPrice.toFixed(2)}`);
      } else {
        item.discountedPrice = 0;
        itemsWithoutPrice++;
        console.log(`⚠️ Item ${item._id} has no price set`);
      }
      
      await item.save();
      updatedCount++;
    }

    console.log("✅ Updated items:", updatedCount);

    // Warning message if items without price exist
    let warningMessage = "";
    if (itemsWithoutPrice > 0) {
      warningMessage = ` (Warning: ${itemsWithoutPrice} items have no price set. Use /api/promotion/fix-prices to add prices)`;
    }

    res.status(200).json({
      success: true,
      message: `Promotion of ${percentage}% applied to ${updatedCount} ${category} items successfully! ✅${warningMessage}`,
      details: {
        totalItems: updatedCount,
        itemsWithPrice: itemsWithPrice,
        itemsWithoutPrice: itemsWithoutPrice,
        category: category,
        promotionPercentage: percentage
      }
    });
  } catch (err) {
    console.error("❌ Promotion update error:", err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Update single item
export const updatePromotion = async (req, res) => {
  try {
    const { category, id } = req.params;
    const { percentage } = req.body;

    if (percentage === undefined) {
      return res.status(400).json({ 
        success: false,
        message: "Percentage is required" 
      });
    }

    const Model = MODEL_MAP[category];
    
    if (!Model) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid category" 
      });
    }

    const item = await Model.findById(id);
    if (!item) {
      return res.status(404).json({ 
        success: false,
        message: "Item not found" 
      });
    }

    // Update promotion percentage
    item.promotionPercentage = percentage;
    
    // Calculate discounted price
    if (item.price && item.price > 0) {
      const discount = (item.price * percentage) / 100;
      item.discountedPrice = item.price - discount;
      
      console.log(`💰 Original Price: $${item.price.toFixed(2)}`);
      console.log(`   Discount: ${percentage}% (-$${discount.toFixed(2)})`);
      console.log(`   Final Price: $${item.discountedPrice.toFixed(2)}`);
    } else {
      item.discountedPrice = 0;
      console.log("⚠️ No price found for this item");
    }
    
    await item.save();

    res.status(200).json({
      success: true,
      message: "Promotion updated successfully ✅",
      data: {
        _id: item._id,
        title: item.title || item.addMesairiTitle || item.name,
        originalPrice: item.price,
        promotionPercentage: item.promotionPercentage,
        discountedPrice: item.discountedPrice,
        savings: item.price ? (item.price - item.discountedPrice) : 0
      }
    });
  } catch (err) {
    console.error("❌ Promotion update error:", err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};