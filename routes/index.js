const router = require('express').Router();
const { initUser, authUser } = require('../controllers/user');

router.post('/init', initUser);
router.post('/signin', authUser);

module.exports = router;
