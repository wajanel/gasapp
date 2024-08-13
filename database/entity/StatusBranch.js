const { DataTypes } = require('sequelize')
const { sequelizeDB } = require('../config');



const StatusBranch = sequelizeDB.define(
    'statusbranch',
    {
        id:{
            type:DataTypes.NUMBER,
            autoIncrement:true,
            primaryKey:true
        },
        status:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:DataTypes.STRING
    },
    {
        tableName:'status_branch'
    }
);

module.exports = StatusBranch;