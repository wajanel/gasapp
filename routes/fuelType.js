const { Router } = require('express');
const { crearFuelType, listadoFuelType, updateFuelType, deleteFuelType } = require('../controllers/fuelType');
const router = Router();

/*
    ruta: host + /fuel-type 
*/

router.post('/', crearFuelType);
router.get('/', listadoFuelType);
router.put('/:id', updateFuelType);
router.delete('/:id', deleteFuelType);

module.exports = router;
