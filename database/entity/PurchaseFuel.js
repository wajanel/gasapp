const { sequelizeDB } = require('../config');
const { DataTypes } = require('sequelize');
const { Branch } = require('./Branch');
const { Provider } = require('./Provider');
const { FuelType } = require('./FuelType');
const { MeasureFuel } = require('./MeasureFuel');

const PurchaseFuel = sequelizeDB.define('PurchaseFuel', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_branch: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Branch,
            key: 'id'
        }
    },
    id_provider: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Provider,
            key: 'id'
        }
    },
    id_fuel_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: FuelType,
            key: 'id'
        }
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    unit_price: {
        type: DataTypes.DECIMAL(8, 4),
        allowNull: false
    },
    quantity: {
        type: DataTypes.DECIMAL(10, 4),
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
    time: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'purchase_fuel',
    timestamps: false
});

Branch.hasMany(PurchaseFuel, { foreignKey: 'id_branch' });
PurchaseFuel.belongsTo(Branch, { foreignKey: 'id_branch' });

Provider.hasMany(PurchaseFuel, { foreignKey: 'id_provider' });
PurchaseFuel.belongsTo(Provider, { foreignKey: 'id_provider' });

FuelType.hasMany(PurchaseFuel, { foreignKey: 'id_fuel_type' });
PurchaseFuel.belongsTo(FuelType, { foreignKey: 'id_fuel_type' });

MeasureFuel.hasMany(PurchaseFuel, { foreignKey: 'id_measure' });
PurchaseFuel.belongsTo(MeasureFuel, { foreignKey: 'id_measure' });

module.exports = { PurchaseFuel };
