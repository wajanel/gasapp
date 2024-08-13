const { response } = require('express');
const { PurchaseFuel } = require('../database/entity/PurchaseFuel');

const crearPurchaseFuel = async (req, res = response) => {
    const { id_branch, id_provider, id_fuel_type, id_user, unit_price, quantity, id_measure, time } = req.body;

    try {
        const response = await PurchaseFuel.create({ id_branch, id_provider, id_fuel_type, id_user, unit_price, quantity, id_measure, time });
        console.log(response);
        return res.json({
            ok: true,
            msg: 'Compra de combustible creada',
            purchaseFuel: response,
            id:response.id
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const listadoPurchaseFuel = async (req, res) => {
    try {
        const listado = await PurchaseFuel.findAll();
        return res.json({
            ok: true,
            msg: 'Listado de compras de combustible',
            listado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const updatePurchaseFuel = async (req, res = response) => {
    const id = req.params.id;
    const { id_branch, id_provider, id_fuel_type, id_user, unit_price, quantity, id_measure, time } = req.body;

    try {
        const result = await PurchaseFuel.update(
            { id_branch, id_provider, id_fuel_type, id_user, unit_price, quantity, id_measure, time },
            { where: { id } }
        );

        if (result[0] === 0) {
            throw new Error('No se encontró la compra de combustible para actualizar.');
        }

        return res.json({
            ok: true,
            msg: 'Compra de combustible actualizada exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const deletePurchaseFuel = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await PurchaseFuel.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No se encontró la compra de combustible para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Compra de combustible eliminada exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    crearPurchaseFuel,
    listadoPurchaseFuel,
    updatePurchaseFuel,
    deletePurchaseFuel
};
