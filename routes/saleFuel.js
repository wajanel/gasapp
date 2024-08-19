const { Router } = require('express');
const { crearSaleFuel, listadoSaleFuel, updateSaleFuel, deleteSaleFuel, listadoCompletoSF } = require('../controllers/saleFuel');
const { validarJWT } = require('../middleware/jwt-validator');
const router = Router();

router.use(validarJWT);
/*
    ruta: host + /sale-fuel 
*/

router.post('/', crearSaleFuel);
router.get('/', listadoSaleFuel);
router.put('/:id', updateSaleFuel);
router.delete('/:id', deleteSaleFuel);
router.get('/listadocompleto', listadoCompletoSF);

module.exports = router;
