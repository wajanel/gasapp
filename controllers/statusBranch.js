const { response } = require('express');
const StatusBranch = require('../database/entity/StatusBranch');

const getAllStatusBranch = async ( req, res = response) =>{
    try {
        const result = await StatusBranch.findAll();
        res.json({
            ok:true,
            result
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:error
        })
    }
};

module.exports = {
    getAllStatusBranch
}