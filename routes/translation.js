const { Router } = require('express');
const { translations } = require('../controllers/translations');

const router = Router();

router.get('/:locale', translations);

module.exports = router;

