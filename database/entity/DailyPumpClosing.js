const { DataTypes } = require('sequelize');
const {sequelizeDB} = require('../config');

const DailyPumpClosing = sequelizeDB.define('dailypumpclosing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_pump: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  id_fuel_type: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  total_amount_previous: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false
  },
  sale: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false
  }
}, {
  tableName: 'daily_pump_closing',
  indexes: [
    {
      unique: true,
      fields: ['id_pump', 'datetime']
    },
    {
      fields: ['id_fuel_type', 'id_pump']
    }
  ]
});

module.exports = DailyPumpClosing;
