const { Router } = require('express');
const { allPumps, crearPump, updatePump, deletePump, pumpsByBranch } = require('../controllers/pump');
const { getAllStatusPump } = require('../controllers/statusPump');

/* host + /pump [] */

const router = Router();


router.get('/', allPumps);
router.get('/:id_branch', pumpsByBranch)
router.post('/', crearPump);
router.put('/:id', updatePump);
router.delete('/:id', deletePump);

router.get('/status/pump', getAllStatusPump);

module.exports = router;


