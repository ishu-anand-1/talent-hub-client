const PasswordReset = require("../models/PasswordReset.js");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await PasswordReset.create({ email, otp, expiresAt });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. Valid for 15 minutes.`,
    });

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: "Email and OTP required" });

  try {
    const match = await PasswordReset.findOne({
      email,
      otp,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    if (!match) return res.status(400).json({ error: "Invalid or expired OTP" });

    await PasswordReset.deleteMany({ email });
    res.json({ message: "OTP verified" });
  } catch (err) {
    res.status(500).json({ error: "OTP verification failed" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ error: "Email and new password required" });

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    const updated = await User.findOneAndUpdate({ email }, { password: hashed });

    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update password" });
  }
};
