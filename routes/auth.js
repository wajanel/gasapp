const { Router } = require('express');
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, listarUsers, updateUser, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middleware/jwt-validator');
const { inputValidator } = require('../middleware/input-validator');
const router = Router();

router.post('/new', 
    [   
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('user_name', 'El nombre de usuario es requerido').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('status_id', 'El status inicial es obligatorio').not().isEmpty(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mayor a 6 caracteres').isLength({min:6}),
        inputValidator
    ], crearUsuario);
router.post('/login',
    [
        check('userName', 'El usuario es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        inputValidator
    ], loginUsuario);
router.get('/users', listarUsers);
router.put('/user/:id', updateUser);
router.get('/renew', validarJWT ,revalidarToken)

module.exports = router;