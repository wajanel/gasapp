const { Router } = require('express');
const { crearFuelPump, listadoFuelPump, updateFuelPump, deleteFuelPump } = require('../controllers/fuelPump');
const { validarJWT } = require('../middleware/jwt-validator');
const router = Router();

router.use(validarJWT);
/*
    ruta: host + /fuel-pump 
*/

router.post('/', crearFuelPump);
router.get('/', listadoFuelPump);
router.put('/:id_fuel_type/:id_pump', updateFuelPump);
router.delete('/:id_fuel_type/:id_pump', deleteFuelPump);

module.exports = router;
