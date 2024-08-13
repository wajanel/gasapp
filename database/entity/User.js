const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config');

const User = sequelizeDB.define(
    'user',
    {
        id:{
            type:DataTypes.NUMBER,
            primaryKey:true,
            autoIncrement:true
        },
        user_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        cod_employee: {
            type:DataTypes.STRING,
            allowNull:false
        },
        status_id:{
            type:DataTypes.NUMBER,
            allowNull:false,
            references:{
                model:'status_user',
                key:'id'
            }
        },
        role:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        tableName:'user'
    }
);

module.exports = User;