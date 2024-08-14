const { response } = require('express');
const { MeasureFuel } = require('../database/entity/MeasureFuel');

const crearMeasureFuel = async (req, res = response) => {
    const { name, description } = req.body;

    if( req.role !== 'admin')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const response = await MeasureFuel.create({ name, description });
        console.log(response);
        return res.json({
            ok: true,
            msg: 'Medida de combustible creada',
            measureFuel: response,
            id:response.id
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const listadoMeasureFuel = async (req, res) => {
    try {
        const listado = await MeasureFuel.findAll();
        return res.json({
            ok: true,
            msg: 'Listado de medidas de combustible',
            listado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const updateMeasureFuel = async (req, res = response) => {
    const id = req.params.id;
    const { name, description } = req.body;

    if( req.role !== 'admin')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const result = await MeasureFuel.update(
            { name, description },
            { where: { id } }
        );

        if (result[0] === 0) {
            throw new Error('No se encontró la medida de combustible para actualizar.');
        }

        return res.json({
            ok: true,
            msg: 'Medida de combustible actualizada exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const deleteMeasureFuel = async (req, res) => {
    const id = req.params.id;

    if( req.role !== 'admin')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});
    
    try {
        const result = await MeasureFuel.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No se encontró la medida de combustible para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Medida de combustible eliminada exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    crearMeasureFuel,
    listadoMeasureFuel,
    updateMeasureFuel,
    deleteMeasureFuel
};
