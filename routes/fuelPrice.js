const { Router } = require('express');
const { crearFuelPrice, listadoFuelPrice, updateFuelPrice, deleteFuelPrice, getLatestFuelPrices } = require('../controllers/fuelPrice');
const { validarJWT } = require('../middleware/jwt-validator');
const router = Router();

router.use(validarJWT);
/*
    ruta: host + /fuel-price 
*/

router.post('/', crearFuelPrice);
router.get('/', listadoFuelPrice);
router.put('/:id', updateFuelPrice);
router.delete('/:id', deleteFuelPrice);
router.get('/latest/:id_pump/:id_fuel_type', getLatestFuelPrices);

module.exports = router;
