const { response } = require('express');
const { FuelPrice } = require('../database/entity/FuelPrice');
const { sequelizeDB } = require('../database/config');

const crearFuelPrice = async (req, res = response) => {
    const { date, price, id_pump, id_fuel_type } = req.body;

    if( req.role !== 'admin')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const response = await FuelPrice.create({ date, price, id_pump, id_fuel_type });
        console.log(response);
        return res.json({
            ok: true,
            msg: 'Precio de combustible creado',
            fuelPrice: response,
            id:response.id
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const listadoFuelPrice = async (req, res) => {
    try {
        const listado = await FuelPrice.findAll();
        return res.json({
            ok: true,
            msg: 'Listado de precios de combustible',
            listado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const updateFuelPrice = async (req, res = response) => {
    const id = req.params.id;
    const { date, price, id_pump, id_fuel_type } = req.body;
    
    if( req.role !== 'admin')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});
    
    try {
        const result = await FuelPrice.update(
            { date, price, id_pump, id_fuel_type },
            { where: { id } }
        );

        if (result[0] === 0) {
            throw new Error('No se encontró el precio de combustible para actualizar.');
        }

        return res.json({
            ok: true,
            msg: 'Precio de combustible actualizado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const deleteFuelPrice = async (req, res) => {
    const id = req.params.id;

    if( req.role !== 'admin')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});
    
    try {
        const result = await FuelPrice.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No se encontró el precio de combustible para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Precio de combustible eliminado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const getLatestFuelPrices = async (req, res = response) => {
    const { id_pump, id_fuel_type } = req.params;

    const query = `
        SELECT fp1.id, fp1.date, fp1.price, fp1.id_pump, fp1.id_fuel_type
        FROM fuel_price fp1
        INNER JOIN (
            SELECT id_fuel_type, MAX(date) AS max_date
            FROM fuel_price
            Where id_fuel_type = :id_fuel_type
            GROUP BY id_fuel_type
        ) fp2
        ON fp1.id_fuel_type = fp2.id_fuel_type AND fp1.date = fp2.max_date
        INNER JOIN pump p ON fp1.id_pump = p.id
        WHERE p.id = :id_pump;
    `;

    try {
        const results = await sequelizeDB.query(query, {
            type: sequelizeDB.QueryTypes.SELECT,
            replacements: { id_pump, id_fuel_type },
            raw: true
        });

        console.log(results);

        return res.json({
            ok: true,
            results
        });
    } catch (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Hubo error al consultar datos de precios'
        });
    }
};




module.exports = {
    crearFuelPrice,
    listadoFuelPrice,
    updateFuelPrice,
    deleteFuelPrice,
    getLatestFuelPrices
};
