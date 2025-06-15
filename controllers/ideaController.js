const Idea = require("../models/idea");

// Create Idea with Image Upload & Tags
exports.createIdea = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const image = req.file?.path || null;

    const newIdea = new Idea({
      title,
      description,
      tags: Array.isArray(tags) ? tags : [], // 💡 Convert CSV tags to array
      image,
      creator: req.userId,
    });

    await newIdea.save();
    res.status(201).json({ message: "Idea created successfully", idea: newIdea });
  } catch (error) {
    console.error("Error creating idea:", error.message);
    res.status(500).json({ message: "Failed to create idea", error: error.message });
  }
};

// Get All Ideas
exports.getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().populate("creator", "username email");
    res.status(200).json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch ideas", error: error.message });
  }
};

// Get Idea by ID
exports.getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id).populate("creator", "username email");
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    res.status(200).json(idea);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch idea", error: error.message });
  }
};

// Update Idea
exports.updateIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    if (idea.creator.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ message: "Idea updated", idea: updatedIdea });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Delete Idea
exports.deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    if (idea.creator.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Idea.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Idea deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
