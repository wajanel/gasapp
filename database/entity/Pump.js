const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config');


const Pump = sequelizeDB.define(
    'pump',{
        id:{
            type:DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        code:{
            type:DataTypes.STRING,
            allowNull:false
        },
        id_status:{
            type:DataTypes.NUMBER,
            allowNull:false
        },
        description:DataTypes.STRING,
        id_branch:{
            type:DataTypes.NUMBER,
            allowNull:false,
            refences:{
                model:'branch',
                key:'id'
            }
        }
    },
    {
        tableName:'pump'
    }
);

module.exports = {Pump};