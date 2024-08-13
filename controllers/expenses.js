const { response } = require('express');
const { Expenses } = require('../database/entity/Expenses');

const crearExpenses = async (req, res = response) => {
    const { id_branch, id_expenses_type, date_time, total, description } = req.body;

    try {
        const response = await Expenses.create({ id_branch, id_expenses_type, date_time, total, description });
        console.log(response);
        return res.json({
            ok: true,
            msg: 'Gasto creado',
            expenses: response,
            id:response.id
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const listadoExpenses = async (req, res) => {
    try {
        const listado = await Expenses.findAll();
        return res.json({
            ok: true,
            msg: 'Listado de gastos',
            listado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const updateExpenses = async (req, res = response) => {
    const id = req.params.id;
    const { id_branch, id_expenses_type, date_time, total, description } = req.body;

    try {
        const result = await Expenses.update(
            { id_branch, id_expenses_type, date_time, total, description },
            { where: { id } }
        );

        if (result[0] === 0) {
            throw new Error('No se encontró el gasto para actualizar.');
        }

        return res.json({
            ok: true,
            msg: 'Gasto actualizado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const deleteExpenses = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Expenses.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No se encontró el gasto para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Gasto eliminado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    crearExpenses,
    listadoExpenses,
    updateExpenses,
    deleteExpenses
};
