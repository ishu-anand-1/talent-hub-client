const db = require("../config/db");

exports.createPost = async (userId, postData) => {
  const { title, description, category, genre, level, video_url } = postData;
  const [result] = await db.execute(
    `INSERT INTO videos (user_id, title, description, category, genre, level, video_url)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userId, title, description, category, genre, level, video_url]
  );
  return result;
};

exports.getPostsByUser = async (userId) => {
  const [rows] = await db.execute("SELECT * FROM videos WHERE user_id = ?", [userId]);
  return rows;
};

exports.deletePost = async (postId, userId) => {
  const [result] = await db.execute(
    "DELETE FROM videos WHERE id = ? AND user_id = ?",
    [postId, userId]
  );
  return result;
};

exports.getAllVideos = async () => {
  const [rows] = await db.execute("SELECT * FROM videos ORDER BY created_at DESC");
  return rows;
};
