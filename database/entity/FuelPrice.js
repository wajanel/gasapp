const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config'); // Importa tu instancia de sequelize
const { FuelPump } = require('./FuelPump');

const FuelPrice = sequelizeDB.define('FuelPrice', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(8, 4),
        allowNull: false
    },
    id_pump: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_fuel_type: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'fuel_price',
    indexes: [
        {
            unique: true,
            fields: ['date', 'id_pump', 'id_fuel_type']
        }
    ]
});

FuelPump.hasMany(FuelPrice, { foreignKey: 'id_pump' });
FuelPump.hasMany(FuelPrice, { foreignKey: 'id_fuel_type' });
FuelPrice.belongsTo(FuelPump, { foreignKey: 'id_pump' });
FuelPrice.belongsTo(FuelPump, { foreignKey: 'id_fuel_type' });

module.exports = { FuelPrice };
