const httpStatusCodes = require('http-status-codes').StatusCodes;
const {
  createCommentService,
  getPostCommentsService,
  getUserCommentsService,
} = require('../services/postComments');

const createComment = async (req, res) => {
  try {
    const userId = req.locals.user._id;
    await createCommentService({ _userId: userId, ...req.body});
    res.sendStatus(httpStatusCodes.CREATED);
  } catch (err) {
    res.sendStatus(err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getPostComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const postComments = await getPostCommentsService(postId);
    res.send(postComments);
  } catch (err) {
    res.sendStatus(err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getUserComments = async (req, res) => {
  try {
    const userId = req.locals.user._id;
    const userComments = await getUserCommentsService(userId);
    res.send(userComments);
  } catch (err) {
    res.sendStatus(err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { createComment, getPostComments, getUserComments };