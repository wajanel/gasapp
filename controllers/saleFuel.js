const { sequelizeDB } = require('../database/config');

const { response } = require('express');
const { SaleFuel } = require('../database/entity/SaleFuel');

const crearSaleFuel = async (req, res = response) => {
    const { id_fuel_price, time, quantity, id_measure } = req.body;

    const id_user = req.uid;
    if( req.role !== 'admin' && req.role !== 'usuario')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const response = await SaleFuel.create({ id_fuel_price, time, quantity, id_measure, id_user });
        console.log(response);
        return res.json({
            ok: true,
            msg: 'Venta de combustible creada',
            saleFuel: response,
            id:response.id
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const listadoSaleFuel = async (req, res) => {
    try {
        const listado = await SaleFuel.findAll();
        return res.json({
            ok: true,
            msg: 'Listado de ventas de combustible',
            listado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const updateSaleFuel = async (req, res = response) => {
    const id = req.params.id;
    const { id_fuel_price, time, quantity, id_measure } = req.body;

    const id_user = req.uid;
    if( req.role !== 'admin' && req.role !== 'usuario')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});


    try {
        const result = await SaleFuel.update(
            { id_fuel_price, time, quantity, id_measure, id_user },
            { where: { id } }
        );

        if (result[0] === 0) {
            throw new Error('No se encontró la venta de combustible para actualizar.');
        }

        return res.json({
            ok: true,
            msg: 'Venta de combustible actualizada exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const deleteSaleFuel = async (req, res) => {
    const id = req.params.id;

    if( req.role !== 'admin' && req.role !== 'usuario')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const result = await SaleFuel.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No se encontró la venta de combustible para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Venta de combustible eliminada exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const listadoCompletoSF = async(req, res = response) => {

    const query = `select sf.id, sf.id_fuel_price, sf.time, sf.quantity, sf.id_measure, sf.id_user, b.name as branch, 
                   p.name as pump, fp.price, fp2.side, mf.name as measure, p.id_branch, fp2.id_pump, fp2.id_fuel_type, sf.closing 
 from sale_fuel sf
 inner join fuel_price fp on fp.id = sf.id_fuel_price
 inner join fuel_pump fp2 
   on fp2.id_fuel_type = fp.id_fuel_type and fp2.id_pump = fp.id_pump 
      inner join pump p on p.id = fp2.id_pump 
      inner join branch b on b.id = p.id_branch
      inner join measure_fuel mf on mf.id = sf.id_measure
 ;`

    try {
        const listado = await sequelizeDB.query(query, {
            type: sequelizeDB.QueryTypes.SELECT,
            raw:true
        })
        
        return res.json({
            ok:true,
            listado
        })
    } catch (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Hubo error al consultar datos de precios'
        });
    }
}

module.exports = {
    crearSaleFuel,
    listadoSaleFuel,
    updateSaleFuel,
    deleteSaleFuel,
    listadoCompletoSF
};
