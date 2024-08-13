const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config');
const { Branch } = require('./Branch');
const { IncomeType } = require('./IncomeType');


const Income = sequelizeDB.define(
    'income',
    {
        id:{
            type:DataTypes.NUMBER,
            primaryKey:true,
            autoIncrement:true
        },
        id_branch:{
            type:DataTypes.NUMBER,
            allowNull:false,
            references:{
                model:'branch',
                key:'id'
            }
        },
        id_income_type:{
            type:DataTypes.NUMBER,
            allowNull:false,
            references:{
                model:'income_type',
                key:'id'
            }
        },
        id_user:{
            type:DataTypes.NUMBER,
            allowNull:false
        },
        total:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        date_process:{
            type:DataTypes.DATE,
            allowNull:false
        },
        description:DataTypes.STRING
    },
    {
        tableName:'income'
    }
);


Branch.hasMany(Income, { foreignKey: 'id_branch' });
Income.belongsTo(Branch, { foreignKey: 'id_branch' });

IncomeType.hasMany(Income, { foreignKey: 'id_income_type' });
Income.belongsTo(IncomeType, { foreignKey: 'id_income_type' });

module.exports = {Income};