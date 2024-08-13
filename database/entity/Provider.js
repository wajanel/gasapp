const { DataTypes} = require('sequelize');
const { sequelizeDB } = require('../config');



const Provider = sequelizeDB.define(
    'provider',
    {
        id:{
            type: DataTypes.NUMBER,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        address:DataTypes.STRING,
        phone_number:DataTypes.STRING,
        description:DataTypes.STRING
    },
    {
        tableName:'provider'
    }
);


module.exports = {Provider};