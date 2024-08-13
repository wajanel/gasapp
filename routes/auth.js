const { Router } = require('express');
const { crearUsuario, loginUsuario, listarUsers, updateUser, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middleware/jwt-validator');
const router = Router();

router.post('/new', crearUsuario);
router.post('/login', loginUsuario);
router.get('/users', listarUsers);
router.put('/user/:id', updateUser);
router.get('/renew', validarJWT ,revalidarToken)

module.exports = router;