const { Router } = require('express');
const { crearIncome, listadoIncome, updateIncome, deleteIncome } = require('../controllers/income');
const router = Router();

/*
    ruta: host + /income 
*/

router.post('/', crearIncome);
router.get('/', listadoIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

module.exports = router;
