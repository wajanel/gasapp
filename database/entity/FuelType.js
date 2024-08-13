const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config');


const FuelType = sequelizeDB.define(
    'fueltype',
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
        tableName:'fuel_type'
    }
);


module.exports = {FuelType};