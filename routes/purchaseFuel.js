const { Router } = require('express');
const { crearPurchaseFuel, listadoPurchaseFuel, updatePurchaseFuel, deletePurchaseFuel } = require('../controllers/purchaseFuel');
const { validarJWT } = require('../middleware/jwt-validator');
const router = Router();

router.use(validarJWT);
/*
    ruta: host + /purchase-fuel 
*/

router.post('/', crearPurchaseFuel);
router.get('/', listadoPurchaseFuel);
router.put('/:id', updatePurchaseFuel);
router.delete('/:id', deletePurchaseFuel);

module.exports = router;
