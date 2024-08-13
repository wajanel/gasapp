
const { DataTypes } = require('sequelize');
const { FuelType } = require('./FuelType');
const { sequelizeDB } = require('../config');
const {Pump} = require('./Pump');

const FuelPump = sequelizeDB.define('FuelPump', {
    id_fuel_type: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: FuelType,
            key: 'id'
        }
    },
    id_pump: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Pump,
            key: 'id'
        }
    },
    side: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    tableName: 'fuel_pump',
    timestamps: false
});

FuelType.belongsToMany(Pump, { through: FuelPump, foreignKey: 'id_fuel_type' });
Pump.belongsToMany(FuelType, { through: FuelPump, foreignKey: 'id_pump' });

module.exports = { FuelPump };
