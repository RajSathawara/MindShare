const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary').cloudinary; // Import configured Cloudinary

const ideaSchema = new mongoose.Schema({

  title: { type: String, required: true },
  description: String,
  tags: [String],
  image: {
    public_id: String, // Cloudinary's unique identifier
    url: String       // CDN URL for the image
  },
  upvotes: { type: Number, default: 0 },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

// Image cleanup hook (runs AFTER an idea is deleted)
ideaSchema.post('findOneAndDelete', async (doc) => {
  try {
    if (doc?.image?.public_id) {
      await cloudinary.uploader.destroy(doc.image.public_id);
      console.log(`Deleted image ${doc.image.public_id} from Cloudinary`);
    }
  } catch (err) {
    console.error('Failed to delete Cloudinary image:', err.message);
    // Don't throw - allow DB deletion to complete
  }
});

module.exports = mongoose.model("Idea", ideaSchema);