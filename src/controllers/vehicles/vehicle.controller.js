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
                price: vehicle.price,
                range: vehicle.range,
                topSpeed: vehicle.top_speed,
                type: vehicle.type,
                stats: vehicle.stats
            },
            features: vehicle.features,
            colors: vehicle.colors
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
                price: vehicle.price,
                range: vehicle.range,
                topSpeed: vehicle.top_speed,
                type: vehicle.type,
                stats: vehicle.stats
            },
            features: vehicle.features,
            colors: vehicle.colors
        };

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

const getTopGeneralFeatures = async (req, res, next) => {
    try {
        const features = await vehicleService.getTopGeneralFeatures();
        res.status(200).json(features);
    } catch (error) {
        next(error);
    }
};

const getRandomVehicleDetails = async (req, res, next) => {
    try {
        const vehicle = await vehicleService.getRandomVehicle();

        if (!vehicle) {
            return res.status(404).json({ message: "No vehicles found" });
        }

        const response = {
            hero: {
                slug: vehicle.slug,
                brand: vehicle.brand,
                model: vehicle.model,
                tagline: vehicle.tagline,
                heroImage: vehicle.hero_image_url,
                price: vehicle.price,
                range: vehicle.range,
                topSpeed: vehicle.top_speed,
                type: vehicle.type,
                stats: vehicle.stats
            },
            features: vehicle.features,
            colors: vehicle.colors
        };

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const listVehicles = async (req, res, next) => {
    try {
        const { name, model, range, type, page, limit } = req.query;
        const result = await vehicleService.searchVehicles(
            { name, model, range, type },
            { page, limit }
        );
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getUniqueModels = async (req, res, next) => {
    try {
        const models = await vehicleService.getUniqueModels();
        res.status(200).json(models);
    } catch (error) {
        next(error);
    }
};

const getUniqueVehicleTypes = async (req, res, next) => {
    try {
        const types = await vehicleService.getUniqueVehicleTypes();
        res.status(200).json(types);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getVehicleDetails,
    createVehicleDetails,
    getTopGeneralFeatures,
    listVehicles,
    getRandomVehicleDetails,
    getUniqueModels,
    getUniqueVehicleTypes
};
