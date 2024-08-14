const {Router} = require('express');
const { doDailyClosing, getAllDailyClosing } = require('../controllers/dailyClosing');
const router = Router();


/*
    ruta: host + /branch 
*/

router.get('/', getAllDailyClosing);
router.post('/daily', doDailyClosing);

module.exports = router;