const videoModel = require('../models/videoModel');
const { cloudinary } = require('../utils/cloudinary');

// Upload via file (e.g. Cloudinary)
exports.uploadVideoToCloudinary = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { title, description, category, genre, level } = req.body;

    if (!req.file || !title || !category || !genre || !level) {
      return res.status(400).json({ error: "All fields and video file are required." });
    }

    const video_url = req.file.path;

    const videoData = {
      user_id,
      title,
      description,
      category: category.toLowerCase(),
      genre,
      level,
      video_url,
    };

    await videoModel.createVideo(videoData);
    res.status(201).json({ message: "Video uploaded successfully", video_url });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload video" });
  }
};

// Upload via YouTube URL
exports.uploadYouTubeVideo = (req, res) => {
  console.log("📩 YouTube Upload Hit");
  console.log("👤 Verified User ID:", req.user?.id);

  console.log("User:", req.user); // Make sure it's not undefined
  console.log("Body:", req.body);

  const { title, description, category, genre, level, video_url } = req.body;
  const user_id = req.user?.id;

  if (!title || !video_url || !category || !genre || !level) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const video = { user_id, title, description, category, video_url, genre, level };

  videoModel.createVideo(video, (err, result) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: "Failed to upload video" });
    }
    res.status(201).json({ message: " YouTube video saved successfully" });
  });
};

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const results = await videoModel.fetchAllVideos();
    return res.status(200).json(results);
  } catch (err) {
    console.error("❌ Error fetching videos:", err);
    return res.status(500).json({ error: "Failed to fetch videos" });
  }
};



// Get videos by logged-in user
exports.  getMyVideos = (req, res) => {
  const user_id = req.user.id;
  videoModel.getVideosByUser(user_id, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch user videos" });
    res.json(results);
  });
};

// Delete a video
exports.deleteVideo = (req, res) => {
  const videoId = req.params.id;
  const user_id = req.user.id;

  videoModel.deleteVideo(videoId, user_id, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to delete video" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Video not found or unauthorized" });
    res.json({ message: "Video deleted successfully" });
  });
};

// Filter videos (Talent page / Learn page)
exports.getFilteredVideos = (req, res) => {
  const { category, genre, level } = req.query;
  const filters = { category, genre, level };

  videoModel.getFilteredVideos(filters, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch filtered videos" });
    res.json(results);
  });
};

exports.getVideosByCategory = (req, res) => {
  const { category } = req.params;
  console.log("📩 GET /videos/category called with:", category);

  videoModel.getVideosByCategory(category, (err, results) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({ error: "Failed to fetch videos" });
    }
    console.log("✅ Sending results:", results); // <-- log the DB result
    res.json(results);
  });
};

