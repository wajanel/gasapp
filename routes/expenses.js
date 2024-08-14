const { Router } = require('express');
const { crearExpenses, listadoExpenses, updateExpenses, deleteExpenses } = require('../controllers/expenses');
const { validarJWT } = require('../middleware/jwt-validator');
const router = Router();

router.use(validarJWT);
/*
    ruta: host + /expenses 
*/

router.post('/', crearExpenses);
router.get('/', listadoExpenses);
router.put('/:id', updateExpenses);
router.delete('/:id', deleteExpenses);

module.exports = router;
