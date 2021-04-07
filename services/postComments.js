const { saveComment, getPostComments, getUserComments } = require('../repositories/postComments');
const { RequestError } = require('../utils/errors');
const { errorTypes } = require('../utils/common');

const createCommentService = async (data) => {
  if (typeof data.message !== 'string' || data.message.length > 100) {
    throw new RequestError(errorTypes.VALIDATION_ERROR);
  }

  const commentData = {
    _userId: data.userId,
    _postId: data.postId,
    message: data.message,
  };

  await saveComment(commentData);
};

const getPostCommentsService = async (postId) => {
  const comments = await getPostComments(postId);

  return comments.map((comment) => ({
    id: comment._id,
    message: comment.message,
    date: comment.date,
  }));
};

const getUserCommentsService = async (userId) => {
  const comments = await getUserComments(userId);

  return comments.map((comment) => ({
    id: comment._id,
    postId: comment._postId,
    message: comment.message,
    date: comment.date,
  }));
};

module.exports = { createCommentService, getPostCommentsService, getUserCommentsService };