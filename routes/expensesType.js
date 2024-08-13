const { Router } = require('express');
const { crearExpensesType, listadoExpensesType, updateExpensesType, deleteExpensesType } = require('../controllers/expensesType');
const router = Router();

/*
    ruta: host + /expenses-type 
*/

router.post('/', crearExpensesType);
router.get('/', listadoExpensesType);
router.put('/:id', updateExpensesType);
router.delete('/:id', deleteExpensesType);

module.exports = router;
