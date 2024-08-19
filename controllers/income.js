const { response } = require('express');
const { Income } = require('../database/entity/Income');

const crearIncome = async (req, res = response) => {
    const { id_branch, id_income_type, total, date_process, description } = req.body;

    const id_user = req.uid;
    if( req.role !== 'admin' && req.role !== 'usuario')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const response = await Income.create({ id_branch, id_income_type, id_user, total, date_process, description });
        console.log(response);
        return res.json({
            ok: true,
            msg: 'Ingreso creado',
            income: response,
            id:response.id
        });
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear el ingreso'
        });
    }
};

const listadoIncome = async (req, res) => {
    try {
        const listado = await Income.findAll();
        return res.json({
            ok: true,
            msg: 'Listado de ingresos',
            listado
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            ok: false,
            msg: 'Error al listar los ingresos'
        });
    }
};

const updateIncome = async (req, res = response) => {
    const id = req.params.id;
    const { id_branch, id_income_type, total, date_process, description } = req.body;

    const id_user = req.uid;
    if( req.role !== 'admin' && req.role !== 'usuario')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const result = await Income.update(
            { id_branch, id_income_type, id_user, total, date_process, description },
            { where: { id } }
        );

        if (result[0] === 0) {
            throw new Error('No se encontró el ingreso para actualizar.');
        }

        return res.json({
            ok: true,
            msg: 'Ingreso actualizado exitosamente.'
        });
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el ingreso'
        });
    }
};

const deleteIncome = async (req, res) => {
    const id = req.params.id;

    if( req.role !== 'admin' && req.role !== 'usuario')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const result = await Income.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No se encontró el ingreso para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Ingreso eliminado exitosamente.'
        });
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el ingreso'
        });
    }
};

module.exports = {
    crearIncome,
    listadoIncome,
    updateIncome,
    deleteIncome
};
