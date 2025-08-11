import Video from "../models/Video.js";
import { v2 as cloudinary } from "cloudinary";

// 📤 Upload via file (Cloudinary)
export const uploadVideoToCloudinary = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { title, description, category, genre, level } = req.body;

    if (!req.file || !title || !category || !genre || !level) {
      return res.status(400).json({ error: "All fields and video file are required." });
    }

    const videoData = new Video({
      user_id,
      title,
      description,
      category: category.toLowerCase(),
      genre,
      level,
      video_url: req.file.path,
      isLearnVideo: false 
    });

    await videoData.save();
    res.status(201).json({ message: "Video uploaded successfully", video_url: req.file.path });
  } catch (err) {
    console.error(" Upload error:", err);
    res.status(500).json({ error: `Failed to upload video: ${err.message}` });
  }
};

// 📤 Upload via YouTube URL
export const uploadYouTubeVideo = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { title, description, category, genre, level, video_url } = req.body;

    if (!title || !video_url || !category || !genre || !level) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const video = new Video({
      user_id,
      title,
      description,
      category: category.toLowerCase(),
      genre,
      level,
      video_url,
      isLearnVideo: false 
    });

    await video.save();
    res.status(201).json({ message: "YouTube video saved successfully" });
  } catch (err) {
    console.error(" Upload error:", err);
    res.status(500).json({ error: `Failed to upload YouTube video: ${err.message}` });
  }
};


export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("user_id", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (err) {
    console.error(" Error fetching videos:", err);
    res.status(500).json({ error: `Failed to fetch videos: ${err.message}` });
  }
};

// 👤 Get videos by logged-in user
export const getMyVideos = async (req, res) => {
  try {
    const videos = await Video.find({ user_id: req.user.id })
      .populate("user_id", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (err) {
    console.error(" Error fetching user videos:", err);
    res.status(500).json({ error: `Failed to fetch user videos: ${err.message}` });
  }
};

// ❌ Delete a video
export const deleteVideo = async (req, res) => {
  try {
    const result = await Video.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });

    if (!result) {
      return res.status(404).json({ error: "Video not found or unauthorized" });
    }

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: `Failed to delete video: ${err.message}` });
  }
};

// 🔍 Filter videos
export const getFilteredVideos = async (req, res) => {
  try {
    const { category, genre, level } = req.query;
    const filters = {};

    if (category && category !== "All") filters.category = category.toLowerCase();
    if (genre && genre !== "All") filters.genre = genre;
    if (level && level !== "All") filters.level = level;

    const videos = await Video.find(filters)
      .populate("user_id", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (err) {
    console.error("❌ Filter error:", err);
    res.status(500).json({ error: `Failed to fetch filtered videos: ${err.message}` });
  }
};

// 📂 Get videos by category (limit 100 random)
export const getVideosByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const videos = await Video.aggregate([
      { $match: { category: category.toLowerCase() } },
      { $sample: { size: 100 } },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "authorInfo",
        },
      },
      { $unwind: "$authorInfo" },
      {
        $project: {
          title: 1,
          description: 1,
          category: 1,
          genre: 1,
          level: 1,
          video_url: 1,
          createdAt: 1,
          author: "$authorInfo.name",
        },
      },
    ]);

    res.status(200).json(videos);
  } catch (err) {
    console.error("❌ DB error:", err);
    res.status(500).json({ error: `Failed to fetch videos by category: ${err.message}` });
  }
};
