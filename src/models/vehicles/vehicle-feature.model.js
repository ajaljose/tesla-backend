const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const VehicleFeature = sequelize.define('VehicleFeature', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subtitle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    tableName: 'vehicle_features',
    timestamps: false,
});
module.exports = VehicleFeature;