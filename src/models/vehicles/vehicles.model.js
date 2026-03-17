const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const VehicleStat = require('./vehicle-stat.model');
const VehicleFeature = require('./vehicle-feature.model');
const VehicleColor = require('./vehicle-color.model');

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tagline: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hero_image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    range: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    top_speed: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'vehicles',
    timestamps: true,
});

Vehicle.hasMany(VehicleStat, {
    foreignKey: 'vehicle_id',
    as: 'stats',
    onDelete: 'CASCADE',
});
VehicleStat.belongsTo(Vehicle, {
    foreignKey: 'vehicle_id',
});

Vehicle.hasMany(VehicleFeature, {
    foreignKey: 'vehicle_id',
    as: 'features',
    onDelete: 'CASCADE',
});
VehicleFeature.belongsTo(Vehicle, {
    foreignKey: 'vehicle_id',
});

Vehicle.hasMany(VehicleColor, {
    foreignKey: 'vehicle_id',
    as: 'colors',
    onDelete: 'CASCADE',
});
VehicleColor.belongsTo(Vehicle, {
    foreignKey: 'vehicle_id',
});

module.exports = Vehicle;