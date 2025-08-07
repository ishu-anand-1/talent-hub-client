const postModel = require('../models/postModel');
const db = require('../config/db');

// Create a post});
exports.createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, category, genre, level, video_url } = req.body;

    if (!title || !video_url || !category || !genre || !level) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await postModel.createPost(userId, {
      title,
      description,
      category,
      genre,
      level,
      video_url,
    });

    res.status(201).json({ message: 'Video uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create video post' });
  }
};


// Get all posts by logged-in user
exports.getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await postModel.getPostsByUser(userId);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    const result = await postModel.deletePost(postId, userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found or not yours' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// New controller for fetching all videos
//exports.getAllVideos = async (req, res) => {
//  try {
//    // You may need to adjust this depending on your postModel structure
//    const videos = await postModel.getAllVideos();
//    res.json(videos);
//  } catch (err) {
//    res.status(500).json({ error: 'Failed to fetch videos' });
//  }
//};
//;
exports.getAllVideos = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM videos"); // Or your correct table
    res.json(rows); // ✅ Return array
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ error: "Server error" });
  }
};

