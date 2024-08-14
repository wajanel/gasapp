const { Router } = require('express');
const { crearIncomeType, listadoIncomeType, updateIncomeType, deleteIncomeType } = require('../controllers/incomeType');
const { validarJWT } = require('../middleware/jwt-validator');
const router = Router();

router.use(validarJWT);
/*
    ruta: host + /income-type 
*/

router.post('/', crearIncomeType);
router.get('/', listadoIncomeType);
router.put('/:id', updateIncomeType);
router.delete('/:id', deleteIncomeType);

module.exports = router;
