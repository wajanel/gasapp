const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config');
const { FuelPrice } = require('./FuelPrice');
const { MeasureFuel } = require('./MeasureFuel');

const SaleFuel = sequelizeDB.define('SaleFuel', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_fuel_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: FuelPrice,
            key: 'id'
        }
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    quantity: {
        type: DataTypes.DECIMAL(8, 4),
        allowNull: false
    },
    id_measure: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MeasureFuel,
            key: 'id'
        }
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'sale_fuel',
    timestamps: false
});

FuelPrice.hasMany(SaleFuel, { foreignKey: 'id_fuel_price' });
SaleFuel.belongsTo(FuelPrice, { foreignKey: 'id_fuel_price' });

MeasureFuel.hasMany(SaleFuel, { foreignKey: 'id_measure' });
SaleFuel.belongsTo(MeasureFuel, { foreignKey: 'id_measure' });

module.exports = { SaleFuel };
