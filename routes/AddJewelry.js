import express from "express";
import multer from "multer";
import path from "path";
import { 
  AddJewelry, 
  getAllJewelry, 
  updateJewelry, 
  deleteJewelry 
} from "../controllers/AddJewelryControl.js";

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/addjewelry", upload.single("imageJewelryURL"), AddJewelry);
router.get("/addjewelry", getAllJewelry);
router.put("/addjewelry/:id", upload.single("imageJewelryURL"), updateJewelry);
router.delete("/addjewelry/:id", deleteJewelry);

export default router;
