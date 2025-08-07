const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET;


exports.register = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  if (!name || !lastname || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)",
      [name, lastname, email, hashedPassword]
    );

    const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: result.insertId,
      token,
    });
  } catch (err) {
    console.error(" Registration error:", err);
    return res.status(500).json({ error: "Server error during registration." });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0)
      return res.status(404).json({ error: "User not found" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(" forgotPassword called for:", email);

  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  try {
    const [users] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (users.length === 0) return res.status(404).json({ error: "User not found" });

    await db.query(
      "INSERT INTO password_resets (email, otp, expires_at) VALUES (?, ?, ?)",
      [email, otp, expiresAt]
    );

    const transporter = require("nodemailer").createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "OTP sent to your email" });

  } catch (err) {
    console.error("❌ Forgot password error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};


exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res.status(400).json({ error: "Email and OTP are required" });

  const sql = `
    SELECT * FROM password_resets 
    WHERE email = ? AND otp = ? AND expires_at > NOW()
    ORDER BY id DESC LIMIT 1
  `;

  db.query(sql, [email, otp], (err, results) => {
    if (err) {
      console.error(" DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

 
    db.query("DELETE FROM password_resets WHERE email = ?", [email], (delErr) =>{
       if (delErr) {
        console.error(" Failed to delete OTP:", delErr);
        return res.status(500).json({ error: "Server error after OTP verification" });
      }
    });

    return res.status(200).json({ message: "OTP verified successfully" });
  });
  return res.status(201).json({
    "success ":true,
    "message":"OTP verified successfully"
  })
};


exports.resetPassword = async (req, res) => {
 const { email, newPassword } = req.body;

if (!email || !newPassword)
    return res.status(400).json({ error: "Email and new password are required" });

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password = ? WHERE email = ?", [hashed, email]);
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("❌ Reset password error:", err);
    return res.status(500).json({ error: "Failed to update password" });
  };
  
};
