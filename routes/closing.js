const {Router} = require('express');
const { doDailyClosing, getAllDailyClosing } = require('../controllers/dailyClosing');
const { validarJWT } = require('../middleware/jwt-validator');
const router = Router();


/*
    ruta: host + /branch 
*/

router.use(validarJWT);

router.get('/', getAllDailyClosing);
router.post('/daily', doDailyClosing);

module.exports = router;