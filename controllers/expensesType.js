const { response } = require('express');
const { ExpensesType } = require('../database/entity/ExpensesType');

const crearExpensesType = async (req, res = response) => {
    const { name, description } = req.body;

    try {
        const response = await ExpensesType.create({ name, description });
        console.log(response);
        return res.json({
            ok: true,
            msg: 'Tipo de gasto creado',
            expensesType: response,
            id:response.id
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const listadoExpensesType = async (req, res) => {
    try {
        const listado = await ExpensesType.findAll();
        return res.json({
            ok: true,
            msg: 'Listado de tipos de gasto',
            listado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const updateExpensesType = async (req, res = response) => {
    const id = req.params.id;
    const { name, description } = req.body;

    try {
        const result = await ExpensesType.update(
            { name, description },
            { where: { id } }
        );

        if (result[0] === 0) {
            throw new Error('No se encontró el tipo de gasto para actualizar.');
        }

        return res.json({
            ok: true,
            msg: 'Tipo de gasto actualizado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const deleteExpensesType = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await ExpensesType.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No se encontró el tipo de gasto para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Tipo de gasto eliminado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    crearExpensesType,
    listadoExpensesType,
    updateExpensesType,
    deleteExpensesType
};
