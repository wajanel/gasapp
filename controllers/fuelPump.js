const { response } = require('express');
const { FuelPump } = require('../database/entity/FuelPump');

const crearFuelPump = async (req, res = response) => {
    const { id_fuel_type, id_pump, side } = req.body;

    console.log({id_fuel_type, id_pump, side});

    if( req.role !== 'admin')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const response = await FuelPump.create({ id_fuel_type, id_pump, side });
        console.log(response);
        return res.json({
            ok: true,
            msg: 'Bomba de combustible creada',
            fuelPump: response,
            id:response.id
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const listadoFuelPump = async (req, res) => {
    try {
        const listado = await FuelPump.findAll();
        return res.json({
            ok: true,
            msg: 'Listado de bombas de combustible',
            listado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const updateFuelPump = async (req, res = response) => {
    const { id_fuel_type, id_pump } = req.params;
    const { side } = req.body;

    if( req.role !== 'admin')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    console.log({id_fuel_type, id_pump, side});

    try {
        const result = await FuelPump.update(
            { side },
            { where: { id_fuel_type, id_pump } }
        );

        if (result[0] === 0) {
            throw new Error('No se encontró la bomba de combustible para actualizar.');
        }

        return res.json({
            ok: true,
            msg: 'Bomba de combustible actualizada exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const deleteFuelPump = async (req, res) => {
    const { id_fuel_type, id_pump } = req.params;

    if( req.role !== 'admin')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});
    
    try {
        const result = await FuelPump.destroy({ where: { id_fuel_type, id_pump } });

        if (result === 0) {
            throw new Error('No se encontró la bomba de combustible para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Bomba de combustible eliminada exitosamente.'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            ok: false,
            msg: 'error al eliminar el lado de la Bomba de combustible'
        });
    }
};

module.exports = {
    crearFuelPump,
    listadoFuelPump,
    updateFuelPump,
    deleteFuelPump
};
