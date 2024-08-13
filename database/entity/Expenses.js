const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config');
const { Branch } = require('./Branch');
const { ExpensesType } = require('./ExpensesType');

const Expenses  = sequelizeDB.define(
    'expenses',
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
        id_expenses_type:{
            type:DataTypes.NUMBER,
            allowNull:false,
            references:{
                model:'expenses_type',
                key:'id'
            }
        },
        date_time:{
            type:DataTypes.DATE,
            allowNull:false
        },
        total:{
            type:DataTypes.DECIMAL(10,4),
            allowNull:false
        },
        description:DataTypes.STRING
    },
    {
        tableName:'expenses'
    }
);


Branch.hasMany(Expenses, { foreignKey: 'id_branch' });
Expenses.belongsTo(Branch, { foreignKey: 'id_branch' });

ExpensesType.hasMany(Expenses, { foreignKey: 'id_expenses_type' });
Expenses.belongsTo(ExpensesType, { foreignKey: 'id_expenses_type' });

module.exports = { Expenses };