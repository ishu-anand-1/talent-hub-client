const express = require("express");
//const authController = require("../controllers/authController");
const userController = require("../controllers/userController"); // ✅ Add this
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

//router.post("/register", authController.register);
//router.post("/login", authController.login);

// Example protected route
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});


router.get("/:id", userController.getUserById);

module.exports = router;
