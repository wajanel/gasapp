const { response } = require('express');
const { PurchaseFuelResume } = require('../database/entity/PurchaseFuelResume');

const crearPurchaseFuelResume = async (req, res = response) => {
    const { invoice, id_purchase_fuel, time, id_user } = req.body;

    try {
        const response = await PurchaseFuelResume.create({ invoice, id_purchase_fuel, time, id_user });
        console.log(response);
        return res.json({
            ok: true,
            msg: 'Resumen de compra de combustible creado',
            purchaseFuelResume: response,
            id:response.id
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const listadoPurchaseFuelResume = async (req, res) => {
    try {
        const listado = await PurchaseFuelResume.findAll();
        return res.json({
            ok: true,
            msg: 'Listado de resúmenes de compras de combustible',
            listado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const updatePurchaseFuelResume = async (req, res = response) => {
    const id = req.params.id;
    const { invoice, id_purchase_fuel, time, id_user } = req.body;

    try {
        const result = await PurchaseFuelResume.update(
            { invoice, id_purchase_fuel, time, id_user },
            { where: { id } }
        );

        if (result[0] === 0) {
            throw new Error('No se encontró el resumen de compra de combustible para actualizar.');
        }

        return res.json({
            ok: true,
            msg: 'Resumen de compra de combustible actualizado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const deletePurchaseFuelResume = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await PurchaseFuelResume.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No se encontró el resumen de compra de combustible para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Resumen de compra de combustible eliminado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    crearPurchaseFuelResume,
    listadoPurchaseFuelResume,
    updatePurchaseFuelResume,
    deletePurchaseFuelResume
};
