import Post from "../models/Post.js";

// Create a post
export const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, category, genre, level, video_url } = req.body;

    if (!title || !video_url || !category || !genre || !level) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await Post.create({
      user: userId,
      title,
      description,
      category,
      genre,
      level,
      video_url
    });

    res.status(201).json({ message: "Video uploaded successfully" });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Failed to create video post" });
  }
};

// Get all posts by logged-in user
export const getPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await Post.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("user", "name email"); // Optional: populate user details

    res.json(posts);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    const post = await Post.findOneAndDelete({ _id: postId, user: userId });

    if (!post) {
      return res.status(404).json({ error: "Post not found or not yours" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email"); // Optional: show author details

    res.json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ error: "Server error" });
  }
};
