const {Router} = require('express');
const { crearBranch, listadoBranch, updateBranch, deleteBranch } = require('../controllers/branch');
const { getAllStatusBranch } = require('../controllers/statusBranch');
const router = Router();


/*
    ruta: host + /branch 
*/

router.post('/', crearBranch);
router.get('/', listadoBranch);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch)
router.get('/statusbranch', getAllStatusBranch);

module.exports = router;