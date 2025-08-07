const db = require('../config/db');

exports.createUser = async (user) => {
  const [result] = await db.query("INSERT INTO users SET ?", user);
  return result;
};

exports.getUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

exports.findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};
