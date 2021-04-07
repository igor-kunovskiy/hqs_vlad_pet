const router = require('express').Router();
const { verifyUser} = require('../controllers/user');
const { getUserComments, getPostComments, createComment } = require('../controllers/postComments');


router.post('/', verifyUser, createComment);
router.get('/', verifyUser, getUserComments);
router.get('/:postId', verifyUser, getPostComments);

module.exports = router;
