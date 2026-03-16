const vehicleService = require('../../services/vehicles/vehicle.service');

const getVehicleDetails = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const vehicle = await vehicleService.getVehicleBySlug(slug);

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        const response = {
            hero: {
                brand: vehicle.brand,
                model: vehicle.model,
                tagline: vehicle.tagline,
                heroImage: vehicle.hero_image_url,
                stats: vehicle.stats
            },
            features: vehicle.features
        };

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const createVehicleDetails = async (req, res, next) => {
    try {
        const vehicleData = req.body;
        const vehicle = await vehicleService.createVehicleDetails(vehicleData);

        const response = {
            hero: {
                brand: vehicle.brand,
                model: vehicle.model,
                tagline: vehicle.tagline,
                heroImage: vehicle.hero_image_url,
                stats: vehicle.stats
            },
            features: vehicle.features
        };

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = { getVehicleDetails, createVehicleDetails };