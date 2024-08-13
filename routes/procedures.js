const { Router } = require('express');
const { allUsers } = require('../controllers/procedures');

const router = Router();


router.get('/getAllUsers', allUsers);

module.exports = router;