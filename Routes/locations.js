const express = require('express');
const router = express.Router();
const { validateJwt } = require('../middleware/auth');
const { getSavedLocations, saveLocation, deleteLocation } = require('../Controller/locationController');

router.get('/', getSavedLocations);
router.post('/', saveLocation);
router.delete('/:id', deleteLocation);

module.exports = router;
