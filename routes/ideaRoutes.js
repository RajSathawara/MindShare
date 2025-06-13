const express = require('express');
const router = express.Router();
const Idea = require('../models/idea');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// POST /api/ideas (Create new idea with image)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    
    const idea = new Idea({
      title,
      description,
      tags,
      creator: req.userId,
      image: req.file ? {
        public_id: req.file.public_id,
        url: req.file.path
      } : null
    });

    await idea.save();
    res.status(201).json(idea);

  } catch (err) {
    console.error('Create idea error:', err);
    if (err.message.includes('image files')) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Failed to create idea" });
  }
});

// GET /api/ideas (Fetch all ideas)
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find()
      .populate('creator', 'email')
      .sort({ createdAt: -1 }); // Newest first
    res.json(ideas);
  } catch (err) {
    console.error('Fetch ideas error:', err);
    res.status(500).json({ error: "Failed to fetch ideas" });
  }
});

// DELETE /api/ideas/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const idea = await Idea.findOneAndDelete({
      _id: req.params.id,
      creator: req.userId // Only allow creator to delete
    });

    if (!idea) {
      return res.status(404).json({ error: "Idea not found or unauthorized" });
    }

    res.json({ message: "Idea deleted successfully" });
  } catch (err) {
    console.error('Delete idea error:', err);
    res.status(500).json({ error: "Failed to delete idea" });
  }
});

module.exports = router;