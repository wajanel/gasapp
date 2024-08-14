const { Router } = require('express');
const { crearFuelType, listadoFuelType, updateFuelType, deleteFuelType } = require('../controllers/fuelType');
const { validarJWT } = require('../middleware/jwt-validator');
const router = Router();

router.use(validarJWT);
/*
    ruta: host + /fuel-type 
*/

router.post('/', crearFuelType);
router.get('/', listadoFuelType);
router.put('/:id', updateFuelType);
router.delete('/:id', deleteFuelType);

module.exports = router;
