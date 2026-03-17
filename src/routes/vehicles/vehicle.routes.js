const express = require('express');
const router = express.Router();
const vehicleController = require('../../controllers/vehicles/vehicle.controller');

router.get('/search', vehicleController.listVehicles);
router.get('/random', vehicleController.getRandomVehicleDetails);
router.get('/top-features', vehicleController.getTopGeneralFeatures);
router.get('/:slug', vehicleController.getVehicleDetails);
router.post('/', vehicleController.createVehicleDetails);
module.exports = router;
