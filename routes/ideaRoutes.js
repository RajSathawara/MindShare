const express = require("express");
const router = express.Router();
const {
  createIdea,
  getIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
} = require("../controllers/ideaController");

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// 🟢 Public routes
router.get("/", getIdeas);
router.get("/:id", getIdeaById);

// 🔐 Protected routes with image upload
router.post("/", verifyToken, upload.single("image"), createIdea);
router.put("/:id", verifyToken, updateIdea);
router.delete("/:id", verifyToken, deleteIdea);

module.exports = router;
