const express = require('express');
const router = express.Router();
const vehicleController = require('../../controllers/vehicles/vehicle.controller');
const yupResolver = require('../../shared/middlewares/yupResolver');
const { createVehicleSchema } = require('../../validations/vehicle.validation');

router.get('/search', vehicleController.listVehicles);
router.get('/random', vehicleController.getRandomVehicleDetails);
router.get('/top-features', vehicleController.getTopGeneralFeatures);
router.get('/models', vehicleController.getUniqueModels);
router.get('/types', vehicleController.getUniqueVehicleTypes);
router.get('/:slug', vehicleController.getVehicleDetails);
router.post('/', yupResolver(createVehicleSchema), vehicleController.createVehicleDetails);
module.exports = router;
