const { DataTypes } = require('sequelize')
const {sequelizeDB} = require('../config');



const StatusPump = sequelizeDB.define(
    'StatusPump',
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
        tableName:'status_pump'
    }
);


module.exports = StatusPump;