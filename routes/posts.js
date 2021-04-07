const router = require('express').Router();
const { verifyUser} = require('../controllers/user');
const { getUserPosts, createPost } = require('../controllers/userPost');

router.get('/', verifyUser, getUserPosts);
router.post('/', verifyUser, createPost);

module.exports = router;
