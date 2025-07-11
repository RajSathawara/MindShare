const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const ideaRoutes = require("./routes/ideaRoutes"); // Idea management routes
const userRoutes = require("./routes/userRoutes"); // User management routes
const cors = require('cors'); // CORS middleware

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // allow Vite frontend
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api", userRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🚀 MongoDB database Connected'))
  .catch((err) => console.log('MongoDB connection failed:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`👀 Server running on http://localhost:${PORT}`);
});
