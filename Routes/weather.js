const express = require('express');
const router = express.Router();
const { validateJwt } = require('../middleware/auth');
const { getCurrentWeather, getForecast, getSriLankaOverview } = require('../Controller/weatherController');

// All weather routes — JWT validation temporarily disabled for debugging
router.get('/current', getCurrentWeather);
router.get('/forecast', getForecast);
router.get('/overview', getSriLankaOverview);

module.exports = router;
