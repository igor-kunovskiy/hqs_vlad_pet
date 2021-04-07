const router = require('express').Router();
const { verifyUser, getUserProfile, getUsers } = require('../controllers/user');

router.get('/', verifyUser, getUsers);
router.get('/:id', verifyUser, getUserProfile);

module.exports = router;
