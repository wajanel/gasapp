const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config');


const DailyBranchFuelClosing = sequelizeDB.define(
    'dailybranchfuelclosing',
    {
        id:{
            type:DataTypes.NUMBER,
            primaryKey:true,
            autoIncrement:true
        },
        id_closing_branch:{
            type:DataTypes.NUMBER,
            allowNull:false,
            references:{
                model:'closing_branch',
                key:'id'
            }
        },
        id_fuel_type:{
            type:DataTypes.NUMBER,
            allowNull:false,
            references:{
                model:'fuel_type',
                key:'id'
            }
        },
        total_sale:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        total_purchase:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        balance_previous:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        balance:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        volume_previous:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        volume_current:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        volume_sale:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        volume_purchase:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        date_process:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },
    {
        tableName:'daily_branch_fuel_closing'
    }
);

module.exports = DailyBranchFuelClosing;