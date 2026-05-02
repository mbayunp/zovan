const express = require('express');
const cors = require('cors');

// Import routes
const surveyRoutes = require('./routes/surveyRoutes');
const authRoutes = require('./routes/authRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();

// Middleware
app.use(cors()); // Mengizinkan akses dari frontend
app.use(express.json()); // Agar bisa membaca body request format JSON

// Daftarkan Routes
app.use('/api/survey', surveyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);

// Route dasar untuk mengecek apakah API hidup
app.get('/', (req, res) => {
    res.status(200).json({ message: "API NgobrolGeo berjalan dengan baik! 🚀" });
});

module.exports = app;