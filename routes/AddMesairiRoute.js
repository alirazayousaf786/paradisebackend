import express from "express";
import multer from "multer";
import path from "path";
import { AddMesairi, getAllMesairi, updateMesairi, deleteMesairi } from "../controllers/AddMesairiControl.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/addmesairi", upload.single("imageMesairiURL"), AddMesairi);
router.get("/addmesairi", getAllMesairi);
router.put("/addmesairi/:id", upload.single("imageMesairiURL"), updateMesairi);
router.delete("/addmesairi/:id", deleteMesairi);

export default router;
