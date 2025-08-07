const db = require("../config/db");

exports.getUserById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email FROM users WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
};
