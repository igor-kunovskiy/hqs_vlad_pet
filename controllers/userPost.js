const httpStatusCodes = require('http-status-codes').StatusCodes;
const {
  getUserPostsService,
  createPostService,
} = require('../services/userPost');

const createPost = async (req, res) => {
  try {
    const userId = req.locals.user._id;
    await createPostService({ _userId: userId, ...req.body});
    res.sendStatus(httpStatusCodes.CREATED);
  } catch (err) {
    res.sendStatus(err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userId = req.locals.user._id;
    const userPosts = await getUserPostsService(userId);
    res.send(userPosts);
  } catch (err) {
    res.sendStatus(err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { createPost, getUserPosts };