const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config');


const DailyClosing = sequelizeDB.define(
    'dailyclosing',
    {
        id:{
            type:DataTypes.NUMBER,
            autoIncrement:true,
            primaryKey:true
        },
        date_process:{
            type:DataTypes.DATE,
            allowNull:false
        },
        id_user:{
            type:DataTypes.NUMBER,
            allowNull:false
        },
        income:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        expenses:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        previous_balance:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        balance:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        total_sale_fuel:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        total_purchase_fuel:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        total_expenses:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        total_other_income:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
    },
    {
        tableName:'daily_closing'
    }
);


module.exports = DailyClosing;