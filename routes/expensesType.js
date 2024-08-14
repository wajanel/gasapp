const { Router } = require('express');
const { crearExpensesType, listadoExpensesType, updateExpensesType, deleteExpensesType } = require('../controllers/expensesType');
const { validarJWT } = require('../middleware/jwt-validator');
const router = Router();

router.use(validarJWT);

/*
    ruta: host + /expenses-type 
*/

router.post('/', crearExpensesType);
router.get('/', listadoExpensesType);
router.put('/:id', updateExpensesType);
router.delete('/:id', deleteExpensesType);

module.exports = router;
