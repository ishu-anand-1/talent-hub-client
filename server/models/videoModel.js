const db = require("../config/db");

// Save a new video (YouTube or Cloudinary)
exports.createVideo = (video, callback) => {
  db.query("INSERT INTO videos SET ?", video, callback);
};

// Get all videos with author name
exports.fetchAllVideos = async () => {
  const [rows] = await db.query(`
    SELECT v.*, u.name AS author 
    FROM videos v 
    JOIN users u ON v.user_id = u.id 
    ORDER BY v.created_at DESC
  `);
  return rows;
};

// Get videos uploaded by a specific user
exports.getVideosByUser = (userId, callback) => {
  db.query(
    `SELECT v.*, u.name AS author 
     FROM videos v 
     JOIN users u ON v.user_id = u.id 
     WHERE v.user_id = ? 
     ORDER BY v.created_at DESC`,
    [userId],
    callback
  );
};

// Delete a video owned by the user
exports.deleteVideo = (videoId, userId, callback) => {
  db.query(
    "DELETE FROM videos WHERE id = ? AND user_id = ?",
    [videoId, userId],
    callback
  );
};

// Get filtered videos (for Talent/Learn filtering)
exports.getFilteredVideos = (filters, callback) => {
  let query = `
    SELECT v.*, u.name AS author 
    FROM videos v 
    JOIN users u ON v.user_id = u.id 
    WHERE 1=1`;
  const params = [];

  if (filters.category && filters.category !== "All") {
    query += " AND v.category = ?";
    params.push(filters.category);
  }

  if (filters.genre && filters.genre !== "All") {
    query += " AND v.genre = ?";
    params.push(filters.genre);
  }

  if (filters.level && filters.level !== "All") {
    query += " AND v.level = ?";
    params.push(filters.level);
  }

  query += " ORDER BY v.created_at DESC";

  db.query(query, params, callback);
};

// Get 100 random videos by category (used on click from homepage card)
exports.getVideosByCategory = (category, callback) => {
  db.query(
    `SELECT v.*, u.name AS author 
     FROM videos v 
     JOIN users u ON v.user_id = u.id 
     WHERE LOWER(v.category) =LOWER(?)  
     ORDER BY RAND() 
     LIMIT 100`,
    [category],
    callback
  );
};
