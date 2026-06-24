const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Load .env for local development only
try { require('dotenv').config(); } catch (e) {}

const weatherRoutes = require('./Routes/weather');
const locationRoutes = require('./Routes/locations');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://frontend-w-9tz1.vercel.app',
    /\.vercel\.app$/,
  ],
  credentials: true,
}));
app.use(express.json());

// Health check first — before anything else
app.get('/', (_req, res) => res.json({ status: 'ok' }));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/weather', weatherRoutes);
app.use('/locations', locationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('MONGO_URI set:', !!process.env.MONGO_URI);
  console.log('OPENWEATHER_API_KEY set:', !!process.env.OPENWEATHER_API_KEY);
});

// MongoDB connection — after server starts
const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err.message));
} else {
  console.error('MONGO_URI is not set — skipping MongoDB connection');
}
