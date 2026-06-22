const axios = require('axios');

const OWM_BASE = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Sri Lanka major cities used for the overview dashboard
const SL_CITIES = [
  'Colombo,LK', 'Kandy,LK', 'Galle,LK', 'Jaffna,LK',
  'Anuradhapura,LK', 'Trincomalee,LK', 'Batticaloa,LK', 'Matara,LK',
];

/**
 * GET /api/weather/current?city=Colombo
 * Returns current weather for a single city
 */
async function getCurrentWeather(req, res) {
  const city = req.query.city || 'Colombo,LK';
  try {
    const { data } = await axios.get(`${OWM_BASE}/weather`, {
      params: { q: city, appid: API_KEY, units: 'metric' },
    });
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: 'Failed to fetch weather' });
  }
}

/**
 * GET /api/weather/forecast?city=Colombo
 * Returns 5-day / 3-hour forecast
 */
async function getForecast(req, res) {
  const city = req.query.city || 'Colombo,LK';
  try {
    const { data } = await axios.get(`${OWM_BASE}/forecast`, {
      params: { q: city, appid: API_KEY, units: 'metric' },
    });
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: 'Failed to fetch forecast' });
  }
}

/**
 * GET /api/weather/overview
 * Returns current weather for all major Sri Lanka cities
 */
async function getSriLankaOverview(req, res) {
  try {
    const requests = SL_CITIES.map(city =>
      axios.get(`${OWM_BASE}/weather`, {
        params: { q: city, appid: API_KEY, units: 'metric' },
      })
    );
    const results = await Promise.allSettled(requests);
    const cities = results
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value.data);
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch overview' });
  }
}

module.exports = { getCurrentWeather, getForecast, getSriLankaOverview };
