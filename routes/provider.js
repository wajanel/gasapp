const { Router } = require('express');
const { crearProvider, listadoProvider, updateProvider, deleteProvider } = require('../controllers/provider');
const router = Router();

/*
    ruta: host + /provider 
*/

router.post('/', crearProvider);
router.get('/', listadoProvider);
router.put('/:id', updateProvider);
router.delete('/:id', deleteProvider);

module.exports = router;
