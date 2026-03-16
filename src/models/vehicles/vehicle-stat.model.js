const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const VehicleStat = sequelize.define('VehicleStat', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    tableName: 'vehicle_stats',
    timestamps: false,
});
module.exports = VehicleStat;