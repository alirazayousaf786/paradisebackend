
import AddBlogModel from "../models/AddBlog.js";

// Add Blog
export const AddBlog = async (req, res) => {
  try {
    const { addBlogTitle, addBlogParagraph, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image || !addBlogTitle || !addBlogParagraph) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = await AddBlogModel.create({
      addBlogTitle,
      addBlogParagraph,
      imageBlogURL: image,
      promotionPercentage: promotionPercentage || 0, // optional
    });

    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get All Blogs
export const getAllBlog = async (req, res) => {
  try {
    const allBlog = await AddBlogModel.find();
    res.status(200).json(allBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { addBlogTitle, addBlogParagraph, promotionPercentage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedBlog = await AddBlogModel.findByIdAndUpdate(
      id,
      {
        ...(addBlogTitle && { addBlogTitle }),
        ...(addBlogParagraph && { addBlogParagraph }),
        ...(image && { imageBlogURL: image }),
        ...(promotionPercentage !== undefined && { promotionPercentage }), // optional update
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await AddBlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ New: Update Promotion Only
export const updateBlogPromotion = async (req, res) => {
  try {
    const { blogId, promotion } = req.body;

    const blog = await AddBlogModel.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.promotionPercentage = promotion;
    await blog.save();

    res.json({
      success: true,
      message: `Promotion updated to ${promotion}%`,
      promotionPercentage: blog.promotionPercentage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
