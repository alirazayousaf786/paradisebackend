import express from "express";
import multer from "multer";
import path from "path";
import {
  addCake,
  getAllCakes,
  updateCake,
  deleteCake,
} from "../controllers/AddCackControl.js";

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/addcake", upload.single("imageCakeURL"), addCake);
router.get("/addcake", getAllCakes);
router.put("/addcake/:id", upload.single("imageCakeURL"), updateCake);
router.delete("/addcake/:id", deleteCake);

export default router;
