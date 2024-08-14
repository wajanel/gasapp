const { Router } = require('express');
const { crearPurchaseFuelResume, listadoPurchaseFuelResume, updatePurchaseFuelResume, deletePurchaseFuelResume } = require('../controllers/purchaseFuelResume');
const { validarJWT } = require('../middleware/jwt-validator');
const router = Router();

router.use(validarJWT);
/*
    ruta: host + /purchase-fuel-resume 
*/

router.post('/', crearPurchaseFuelResume);
router.get('/', listadoPurchaseFuelResume);
router.put('/:id', updatePurchaseFuelResume);
router.delete('/:id', deletePurchaseFuelResume);

module.exports = router;
