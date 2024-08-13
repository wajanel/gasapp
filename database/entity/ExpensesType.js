
const { DataTypes }  = require('sequelize');
const { sequelizeDB } = require('../config');


const ExpensesType = sequelizeDB.define(
    'expensestype',
    {
        id:{
            type:DataTypes.NUMBER,
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
        tableName:'expenses_type'
    }
);

module.exports = {ExpensesType};
