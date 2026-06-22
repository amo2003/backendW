const Location = require('../Model/Location');

// GET /api/locations — get saved locations for the logged-in user
async function getSavedLocations(req, res) {
  try {
    const userId = req.auth?.sub || 'anonymous';
    const locations = await Location.find({ userId }).sort({ savedAt: -1 });
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
}

// POST /api/locations — save a new location
async function saveLocation(req, res) {
  try {
    const userId = req.auth?.sub || 'anonymous';
    const { city, country, lat, lon } = req.body;
    if (!city) return res.status(400).json({ error: 'city is required' });

    const existing = await Location.findOne({ userId, city });
    if (existing) return res.status(409).json({ error: 'Location already saved' });

    const location = await Location.create({ userId, city, country: country || 'LK', lat, lon });
    res.status(201).json(location);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save location' });
  }
}

// DELETE /api/locations/:id — remove a saved location
async function deleteLocation(req, res) {
  try {
    const userId = req.auth?.sub || 'anonymous';
    const location = await Location.findOneAndDelete({ _id: req.params.id, userId });
    if (!location) return res.status(404).json({ error: 'Location not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete location' });
  }
}

module.exports = { getSavedLocations, saveLocation, deleteLocation };
