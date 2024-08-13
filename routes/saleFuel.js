const { Router } = require('express');
const { crearSaleFuel, listadoSaleFuel, updateSaleFuel, deleteSaleFuel } = require('../controllers/saleFuel');
const router = Router();

/*
    ruta: host + /sale-fuel 
*/

router.post('/', crearSaleFuel);
router.get('/', listadoSaleFuel);
router.put('/:id', updateSaleFuel);
router.delete('/:id', deleteSaleFuel);

module.exports = router;
