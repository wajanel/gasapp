const {response} = require('express');
const { Branch } = require('../database/entity/Branch');


const crearBranch = async (req, res = response)=>{
    const { name, address, id_status, description, phone} = req.body;
    
    const id_user = req.uid;
    if( req.role !== 'admin')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const response = await Branch.create({name, address, id_status, id_user, description, phone})
        console.log(response);
        return res.json({
            ok:true,
            msg:'crearBranch',
            id:response.id
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:error
        })
    }
};



const listadoBranch = async (req, res)=>{

    try {
        const listado = await Branch.findAll();
        return res.json({
            ok:true,
            msg:'listado',
            listado
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:error
        })
    }
};

const updateBranch = async (req, res = response) =>{
    const id = req.params.id;
    const { name, address, id_status, description, phone} = req.body;
    
    const id_user = req.uid;
    if( req.role !== 'admin')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const result = await Branch.update(
            {name, address, id_status, id_user, description, phone},{
                where: {
                    id
                }
            }
        )

        if (result[0] === 0) {
            throw new Error('No se encontró la sucursal para actualizar.');
        } 

        return res.json({
            ok:true,
            msg:'Sucursal actualizada exitosamente.'
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:error
        })
    }
}

const deleteBranch = async ( req, res) => {

    const id = req.params.id;

    if( req.role !== 'admin')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const result = await Branch.destroy({
            where:{
                id
            }
        })

        if (result[0] === 0) {
            throw new Error( 'No se encontró la sucursal para actualizar.');
        } 
        
        res.json({
            ok:true,
            msg:'Sucursal actualizada exitosamente.'
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:error
        })
    }
}

module.exports = {
    crearBranch,
    listadoBranch,
    updateBranch,
    deleteBranch
}