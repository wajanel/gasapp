const { Router } = require('express');
const { allUsers } = require('../controllers/procedures');
const { validarJWT } = require('../middleware/jwt-validator');

const router = Router();

router.use(validarJWT);

router.get('/getAllUsers', allUsers);

module.exports = router;