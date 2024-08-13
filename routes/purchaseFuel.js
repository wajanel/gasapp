const { Router } = require('express');
const { crearPurchaseFuel, listadoPurchaseFuel, updatePurchaseFuel, deletePurchaseFuel } = require('../controllers/purchaseFuel');
const router = Router();

/*
    ruta: host + /purchase-fuel 
*/

router.post('/', crearPurchaseFuel);
router.get('/', listadoPurchaseFuel);
router.put('/:id', updatePurchaseFuel);
router.delete('/:id', deletePurchaseFuel);

module.exports = router;
