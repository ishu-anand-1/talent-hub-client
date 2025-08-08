import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error:
          err.name === "TokenExpiredError"
            ? "Token expired. Please log in again."
            : "Invalid token."
      });
    }

    req.user = { id: decoded.id, email: decoded.email }; // Matches controller JWT payload
    next();
  });
};
