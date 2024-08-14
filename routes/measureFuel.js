const { Router } = require('express');
const { crearMeasureFuel, listadoMeasureFuel, updateMeasureFuel, deleteMeasureFuel } = require('../controllers/measureFuel');
const { validarJWT } = require('../middleware/jwt-validator');
const router = Router();

router.use(validarJWT);
/*
    ruta: host + /measure-fuel 
*/

router.post('/', crearMeasureFuel);
router.get('/', listadoMeasureFuel);
router.put('/:id', updateMeasureFuel);
router.delete('/:id', deleteMeasureFuel);

module.exports = router;
