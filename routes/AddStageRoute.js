import express from "express";
import multer from "multer";
import path from "path";
import { AddStage, getAllStage, updateStage, deleteStage } from "../controllers/AddStageControl.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/addstage", upload.single("imageStageURL"), AddStage);
router.get("/addstage", getAllStage);
router.put("/addstage/:id", upload.single("imageStageURL"), updateStage);
router.delete("/addstage/:id", deleteStage);

export default router;