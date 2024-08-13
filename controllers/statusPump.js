const { response } = require('express');
const StatusPump = require('../database/entity/StatusPump');


const getAllStatusPump = async (req, res = response) => {

    try {
        const result = await StatusPump.findAll();
        res.json({
            ok:true,
            result
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            error
        })
    }

};


module.exports = { getAllStatusPump }