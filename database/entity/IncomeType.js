const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config');


const IncomeType = sequelizeDB.define(
    'incometype',
    {
        id:{
            type: DataTypes.NUMBER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:DataTypes.STRING
    },
    {
        tableName:'income_type'
    }
);


module.exports = {IncomeType};