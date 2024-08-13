const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config');


const Branch = sequelizeDB.define(
    'branch',
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
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        id_status:{
            type:DataTypes.NUMBER,
            allowNull:false
        },
        id_user: {
            type:DataTypes.NUMBER,
            allowNull:false
        },
        description:DataTypes.STRING,
        phone:DataTypes.STRING
    },
    {
        tableName:'branch',
        updatedAt:'modified'
    }
);


module.exports = {
    Branch
}