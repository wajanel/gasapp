const { Router } = require('express');
const { crearIncome, listadoIncome, updateIncome, deleteIncome } = require('../controllers/income');
const { validarJWT } = require('../middleware/jwt-validator');
const router = Router();

router.use(validarJWT);
/*
    ruta: host + /income 
*/

router.post('/', crearIncome);
router.get('/', listadoIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

module.exports = router;
