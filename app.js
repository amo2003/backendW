const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const weatherRoutes = require('./Routes/weather');
const locationRoutes = require('./Routes/locations');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/locations', locationRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
