const { Router } = require('express');
const { crearIncomeType, listadoIncomeType, updateIncomeType, deleteIncomeType } = require('../controllers/incomeType');
const router = Router();

/*
    ruta: host + /income-type 
*/

router.post('/', crearIncomeType);
router.get('/', listadoIncomeType);
router.put('/:id', updateIncomeType);
router.delete('/:id', deleteIncomeType);

module.exports = router;
