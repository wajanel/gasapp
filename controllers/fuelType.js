const { response } = require('express');
const { FuelType } = require('../database/entity/FuelType');

const crearFuelType = async (req, res = response) => {
    const { name, description } = req.body;

    try {
        const response = await FuelType.create({ name, description });
        console.log(response);
        return res.json({
            ok: true,
            msg: 'Tipo de combustible creado',
            fuelType: response,
            id:response.id
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const listadoFuelType = async (req, res) => {
    try {
        const listado = await FuelType.findAll();
        return res.json({
            ok: true,
            msg: 'Listado de tipos de combustible',
            listado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const updateFuelType = async (req, res = response) => {
    const id = req.params.id;
    const { name, description } = req.body;

    try {
        const result = await FuelType.update(
            { name, description },
            { where: { id } }
        );

        if (result[0] === 0) {
            throw new Error('No se encontró el tipo de combustible para actualizar.');
        }

        return res.json({
            ok: true,
            msg: 'Tipo de combustible actualizado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const deleteFuelType = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await FuelType.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No se encontró el tipo de combustible para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Tipo de combustible eliminado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    crearFuelType,
    listadoFuelType,
    updateFuelType,
    deleteFuelType
};
