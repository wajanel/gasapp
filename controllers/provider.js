const { response } = require('express');
const { Provider } = require('../database/entity/Provider')

const crearProvider = async (req, res = response) => {
    const { name, address, phone_number, description } = req.body;

    try {
        const response = await Provider.create({ name, address, phone_number, description });
        console.log(response);
        return res.json({
            ok: true,
            msg: 'Provider creado',
            provider: response,
            id:response.id
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const listadoProvider = async (req, res) => {
    try {
        const listado = await Provider.findAll();
        console.log(listado)
        return res.json({
            ok: true,
            msg: 'Listado de providers',
            listado
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const updateProvider = async (req, res = response) => {
    const id = req.params.id;
    const { name, address, phone_number, description } = req.body;

    try {
        const result = await Provider.update(
            { name, address, phone_number, description },
            { where: { id } }
        );

        if (result[0] === 0) {
            throw new Error('No se encontró el proveedor para actualizar.');
        }

        return res.json({
            ok: true,
            msg: 'Proveedor actualizado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const deleteProvider = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Provider.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No se encontró el proveedor para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Proveedor eliminado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    crearProvider,
    listadoProvider,
    updateProvider,
    deleteProvider
};
