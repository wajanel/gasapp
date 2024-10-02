const {response} = require('express')
const  {Pump} = require('../database/entity/Pump');

const crearPump = async(req, res = response) => {
    try {
        
        if( req.role !== 'admin')
            return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});
        
        const {name, code, id_status, description, id_branch} = req.body;
        console.log({name, code, id_status, description, id_branch})
        const result = await Pump.create({name, code, id_status, description, id_branch});

        return res.json({
            ok:true,
            msg:'Bomba creada',
            result,
            id:result.id
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok:false,
            msg:'Error en creación de bombas'
        })
    }

}

const updatePump = async ( req, res = response) => {

    try {
        const id = req.params.id
        
        if( req.role !== 'admin')
            return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

        const {name, code, id_status, description, id_branch} = req.body;
        const result = await Pump.update({name, code, id_status, description, id_branch}, 
            {
                where:{id}
            }
        )

        let msg;
        if (result[0] === 0) {
            msg = 'No se encontró la bomba para actualizar.';
          } else {
            msg = 'Bomba actualizada exitosamente.';
          }
        return res.json({
            ok:true,
            msg
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:error
        })
    }
}

const allPumps = async ( req, res = response) =>{

    try {
        console.log('allPumps');
        const listado = await Pump.findAll();
        return res.json({
            ok:true,
            listado
        })
    } catch (error) {
        console.log({error});
        return res.status(500).json({
            ok:false,
            msg:error
        })
    }
}

const pumpsByBranch = async ( req, res = response) =>{
    const { id_branch } = req.params;
    try {
        console.log('allPumps');
        const listado = await Pump.findAll(
            {
                where:{
                id_branch
            }
        }
        );
        return res.json({
            ok:true,
            listado
        })
    } catch (error) {
        console.log({error});
        return res.status(500).json({
            ok:false,
            msg:error
        })
    }
}

const deletePump = async (req, res) => {
    const id = req.params.id;

    if( req.role !== 'admin')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const result = await Pump.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No se encontró la bomba de combustible para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Bomba de combustible eliminada exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};


module.exports = {
    allPumps,
    updatePump,
    crearPump,
    deletePump,
    pumpsByBranch
}


