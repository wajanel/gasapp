const { Router } = require('express');
const { crearExpenses, listadoExpenses, updateExpenses, deleteExpenses } = require('../controllers/expenses');
const router = Router();

/*
    ruta: host + /expenses 
*/

router.post('/', crearExpenses);
router.get('/', listadoExpenses);
router.put('/:id', updateExpenses);
router.delete('/:id', deleteExpenses);

module.exports = router;
