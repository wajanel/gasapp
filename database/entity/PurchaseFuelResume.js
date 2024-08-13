const { DataTypes } = require('sequelize');
const { PurchaseFuel } = require('./PurchaseFuel');
const { sequelizeDB } = require('../config');

const PurchaseFuelResume = sequelizeDB.define('PurchaseFuelResume', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    invoice: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    id_purchase_fuel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PurchaseFuel,
            key: 'id'
        }
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'purchase_fuel_resume',
    indexes: [
        {
            unique: true,
            fields: ['invoice', 'id_purchase_fuel']
        },
        {
            fields: ['id_purchase_fuel']
        }
    ]
});

PurchaseFuel.hasMany(PurchaseFuelResume, { foreignKey: 'id_purchase_fuel' });
PurchaseFuelResume.belongsTo(PurchaseFuel, { foreignKey: 'id_purchase_fuel' });

module.exports = { PurchaseFuelResume };
