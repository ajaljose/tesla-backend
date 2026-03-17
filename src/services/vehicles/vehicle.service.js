const { Op } = require('sequelize');
const Vehicle = require('../../models/vehicles/vehicles.model');
const VehicleStat = require('../../models/vehicles/vehicle-stat.model');
const VehicleFeature = require('../../models/vehicles/vehicle-feature.model');

const getVehicleBySlug = async (slug) => {
    return await Vehicle.findOne({
        where: { slug },
        attributes: ['brand', 'model', 'tagline', 'hero_image_url', 'price', 'range', 'top_speed', 'type'],
        include: [
            {
                model: VehicleStat,
                as: 'stats',
                attributes: ['value', 'label']
            },
            {
                model: VehicleFeature,
                as: 'features',
                attributes: ['title', 'subtitle', 'description', ['image_url', 'image']]
            }
        ]
    });
};

const createVehicleDetails = async (vehicleData) => {
    const { slug, hero, features, price, range, top_speed, type } = vehicleData;
    const { brand, model, tagline, heroImage, stats } = hero || {};

    const transaction = await Vehicle.sequelize.transaction();

    try {
        const vehicle = await Vehicle.create({
            slug: slug || (brand && model ? `${brand}-${model}`.toLowerCase().replace(/\s+/g, '-') : 'unknown-slug'),
            brand,
            model,
            tagline,
            hero_image_url: heroImage,
            price,
            range,
            top_speed,
            type
        }, { transaction });

        if (stats && stats.length > 0) {
            const statsData = stats.map((stat, index) => ({
                vehicle_id: vehicle.id,
                label: stat.label,
                value: stat.value,
                sort_order: index
            }));
            await VehicleStat.bulkCreate(statsData, { transaction });
        }

        if (features && features.length > 0) {
            const featuresData = features.map((feature, index) => ({
                vehicle_id: vehicle.id,
                title: feature.title,
                subtitle: feature.subtitle,
                image_url: feature.image,
                sort_order: index
            }));
            await VehicleFeature.bulkCreate(featuresData, { transaction });
        }

        await transaction.commit();
        return await getVehicleBySlug(vehicle.slug);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const getTopGeneralFeatures = async () => {
    return await VehicleFeature.findAll({
        where: { is_general: true },
        attributes: ['title', 'subtitle', 'description', ['image_url', 'image']],
        order: [['sort_order', 'ASC']],
        limit: 3
    });
};

const searchVehicles = async (filters, pagination) => {
    const { name, model, range, type } = filters;
    const { page = 1, limit = 10 } = pagination;
    const offset = (page - 1) * limit;

    const where = {};

    if (name) {
        where[Op.or] = [
            { brand: { [Op.like]: `%${name}%` } },
            { model: { [Op.like]: `%${name}%` } }
        ];
    }

    if (model) {
        where.model = { [Op.like]: `%${model}%` };
    }

    if (range) {
        where.range = { [Op.gte]: range };
    }

    if (type) {
        where.type = type;
    }

    const { count, rows } = await Vehicle.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        attributes: [
            'slug', 'brand', 'model', 'price', 'range', 
            ['top_speed', 'topSpeed'], 
            ['hero_image_url', 'imageUrl'], 
            ['type', 'typeOfCar']
        ],
        order: [['createdAt', 'DESC']]
    });

    return {
        vehicles: rows,
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / limit)
    };
};

module.exports = { 
    getVehicleBySlug, 
    createVehicleDetails, 
    getTopGeneralFeatures, 
    searchVehicles 
};
