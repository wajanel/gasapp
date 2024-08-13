const { sequelizeDB } = require('../database/config');
const { response } = require('express')


const allUsers = async ( req, res = response)=> {
    try {
        const result = await sequelizeDB.query('call getAllUsers()');
        res.json({
            ok:true,
            result
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al ejecutar proceso almacenado'
        })
    }

};

module.exports = { allUsers };