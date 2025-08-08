import express from "express";
import * as videoController from "../controllers/videoController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";

const router = express.Router();
const upload = multer({ storage });

// === Upload Routes ===
// Upload to Cloudinary (video file)
router.post("/", verifyToken, upload.single("video"), videoController.uploadVideoToCloudinary);

// Save YouTube link
router.post("/youtube", verifyToken, videoController.uploadYouTubeVideo);

// === Fetch Routes ===
router.get("/category/:category", videoController.getVideosByCategory);
router.get("/get-all-video", videoController.getAllVideos);
router.get("/my-videos", verifyToken, videoController.getMyVideos);

// === Delete Route ===
router.delete("/:id", verifyToken, videoController.deleteVideo);

// === Test Route (remove in production) ===
router.post("/youtube-test", (req, res) => {
  console.log("Test Hit");
  res.json({ message: "Route working" });
});

export default router;
