const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config');

const DailyClosingBranch = sequelizeDB.define(
    'dailyclosingbranch',
    {
        id:{
            type:DataTypes.NUMBER,
            autoIncrement:true,
            primaryKey:true
        },
        id_daily_closing:{
            type:DataTypes.NUMBER,
            allowNull:false,
            references:{
                model:'dailyclosing',
                key:'id'
            }
        },
        id_branch:{
            type:DataTypes.NUMBER,
            allowNull:false,
            references:{
                model:'branch',
                key:'id'
            }
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
        total_purchase:{
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
        date_process:{
            type:DataTypes.DATE,
            allowNull:false
        },
    },
    {
        tableName:'daily_closing_branch'
    }
);


module.exports = DailyClosingBranch;