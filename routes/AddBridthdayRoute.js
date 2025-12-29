import express from "express";
import multer from "multer";
import path from "path";
import { AddBirthday, getAllBirthday, updateBirthday, deleteBirthday } from "../controllers/AddBridthday.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/addbirthday", upload.single("imageBirthdayURL"), AddBirthday);
router.get("/addbirthday", getAllBirthday);
router.put("/addbirthday/:id", upload.single("imageBirthdayURL"), updateBirthday);
router.delete("/addbirthday/:id", deleteBirthday);

export default router;