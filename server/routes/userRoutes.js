import express from "express";
import {  getUserById,getProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // ✅ Changed to import
import {register, login,} from "../controllers/authController.js"
const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Test protected route
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});
router.get("/profile", verifyToken, getProfile);

// Get user by ID (protected)
router.get("/:id", verifyToken, getUserById);

export default router;
