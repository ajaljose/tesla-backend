const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const VehicleColor = sequelize.define('VehicleColor', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    vehicle_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'vehicles',
            key: 'id'
        }
    },
    color_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'vehicle_colors',
    timestamps: false,
});

module.exports = VehicleColor;
