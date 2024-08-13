const { response } = require('express');
const { IncomeType } = require('../database/entity/IncomeType');

const crearIncomeType = async (req, res = response) => {
    const { name, description } = req.body;

    try {
        const response = await IncomeType.create({ name, description });
        console.log(response);
        return res.json({
            ok: true,
            msg: 'Tipo de ingreso creado',
            incomeType: response,
            id:response.id
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const listadoIncomeType = async (req, res) => {
    try {
        const listado = await IncomeType.findAll();
        return res.json({
            ok: true,
            msg: 'Listado de tipos de ingreso',
            listado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const updateIncomeType = async (req, res = response) => {
    const id = req.params.id;
    const { name, description } = req.body;

    try {
        const result = await IncomeType.update(
            { name, description },
            { where: { id } }
        );

        if (result[0] === 0) {
            throw new Error('No se encontró el tipo de ingreso para actualizar.');
        }

        return res.json({
            ok: true,
            msg: 'Tipo de ingreso actualizado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const deleteIncomeType = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await IncomeType.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No se encontró el tipo de ingreso para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Tipo de ingreso eliminado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    crearIncomeType,
    listadoIncomeType,
    updateIncomeType,
    deleteIncomeType
};
