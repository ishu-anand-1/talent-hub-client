const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { verifyToken } = require('../middleware/authMiddleware');

const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });

// Upload to Cloudinary (video file)
router.post('/', verifyToken, upload.single('video'), videoController.uploadVideoToCloudinary);

// Save YouTube link (no file upload, just a link)
router.post('/youtube', verifyToken, videoController.uploadYouTubeVideo);
router.get('/category/:category', videoController.getVideosByCategory);

router.get('/get-all-video', videoController.getAllVideos);

router.get('/my-videos', verifyToken, videoController.getMyVideos);
router.delete('/delete/:id', verifyToken, videoController.deleteVideo);


router.post('/youtube-test', (req, res) => {
  console.log(" Test Hit");
  res.json({ message: "Route working" });
});

module.exports = router;
