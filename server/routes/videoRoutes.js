import express from "express";
import * as videoController from "../controllers/videoController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";

const router = express.Router();
const upload = multer({ storage });

// ================== 📤 Upload Routes ==================

// Upload video file to Cloudinary (Authenticated)
router.post(
  "/upload",
  verifyToken,
  upload.single("video"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }
    next();
  },
  videoController.uploadVideoToCloudinary
);

// Save YouTube video link (Authenticated)
router.post(
  "/upload-youtube",
  verifyToken,
  videoController.uploadYouTubeVideo
);

// ================== 📄 Fetch Routes ==================

// Fetch ALL videos (Learn Page)
router.get("/get-all-video", videoController.getAllVideos);

// Fetch logged-in user's videos (Talent Page)
router.get("/my-videos", verifyToken, videoController.getMyVideos);

// Fetch videos by category (random 100)
router.get("/category/:category", videoController.getVideosByCategory);

// Filter videos by query params
// Example: /filter?category=music&genre=rock&level=beginner
router.get("/filter", videoController.getFilteredVideos);

// ================== ❌ Delete Route ==================

// Delete video by ID (Authenticated)
router.delete("/:id", verifyToken, videoController.deleteVideo);

// ================== 🛠 Test Route ==================

// Test route to verify video routes work
router.get("/youtube-test", (req, res) => {
  console.log("✅ YouTube Test Route Hit");
  res.json({ message: "Video routes are working fine" });
});

export default router;
