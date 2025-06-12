// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get the token from Authorization header: "Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Make user info available in request
    next(); // Pass control to next middleware or route
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
