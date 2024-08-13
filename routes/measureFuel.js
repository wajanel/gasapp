const { Router } = require('express');
const { crearMeasureFuel, listadoMeasureFuel, updateMeasureFuel, deleteMeasureFuel } = require('../controllers/measureFuel');
const router = Router();

/*
    ruta: host + /measure-fuel 
*/

router.post('/', crearMeasureFuel);
router.get('/', listadoMeasureFuel);
router.put('/:id', updateMeasureFuel);
router.delete('/:id', deleteMeasureFuel);

module.exports = router;
