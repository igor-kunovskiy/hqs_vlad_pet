const Comment = require('../model/postComment');

const { DataBaseError } = require('../utils/errors');
const { errorTypes } = require('../utils/common');

const saveComment = async (commentData) => {
  const comment = new Comment(commentData);
  try {
    await comment.save();
  } catch (err) {
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

const getUserComments = async (id) => {
  try {
    return await Comment.find({ _userId: id });
  } catch (err) {
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

const getPostComments = async (id) => {
  try {
    return await Comment.find({ _postId: id });
  } catch (err) {
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

module.exports = { saveComment, getUserComments, getPostComments };