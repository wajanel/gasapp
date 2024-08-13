const { DataTypes } = require('sequelize');
const { sequelizeDB } = require('../config');


const UserStatus = sequelizeDB.define(
    'userstatus',
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
        tableName:'user_status'
    }
);


module.exports = UserStatus;