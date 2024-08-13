const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config');


const MeasureFuel = sequelizeDB.define(
    'measurefuel',
    {
        id:{
            type:DataTypes.NUMBER,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:DataTypes.STRING
    },
    {
        tableName:'measure_fuel'
    }
);


module.exports = {MeasureFuel};