const {Router} = require('express');
const { doDailyClosing } = require('../controllers/dailyClosing');
const router = Router();


/*
    ruta: host + /branch 
*/

router.post('/daily', doDailyClosing);

module.exports = router;