import express from "express";
import multer from "multer";
import path from "path";
import { AddCar, getAllCar, updateCar, deleteCar } from "../controllers/AddCarControl.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/addcar", upload.single("imageCarURL"), AddCar);
router.get("/addcar", getAllCar);
router.put("/addcar/:id", upload.single("imageCarURL"), updateCar);
router.delete("/addcar/:id", deleteCar);

export default router;