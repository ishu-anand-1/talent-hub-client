import express from "express";
import {
  uploadVideoToCloudinary,
  uploadYouTubeVideo,
  getAllVideos,
  getMyVideos,
  deleteVideo,
  getFilteredVideos,
  getVideosByCategory
}from "../controllers/videoController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";

const router = express.Router();
const upload = multer({ storage });

// ================== 📤 Upload Routes ==================

// Upload video file to Cloudinary (Authenticated)
router.post(
  "/",
  verifyToken,
  upload.single("video"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }
    next();
  },
  uploadVideoToCloudinary
);

// Save YouTube video link (Authenticated)
router.post("/youtube",verifyToken,uploadYouTubeVideo);



// Fetch ALL videos (Learn Page)
router.get("/get-all-video",getAllVideos);

// Fetch logged-in user's videos (Talent Page)
router.get("/my-video",verifyToken,getMyVideos);

// Fetch videos by category (random 100)
router.get("/category/:category",getVideosByCategory);

// Filter videos by query params
// Example: /filter?category=music&genre=rock&level=beginner
router.get("/filter",getFilteredVideos);



router.delete("/:id", verifyToken,deleteVideo);



router.get("/youtube-test", (req, res) => {
  console.log("✅ YouTube Test Route Hit");
  res.json({ message: "Video routes are working fine" });
});

export default router;
