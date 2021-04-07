const { savePost, getUserPosts } = require('../repositories/userPost');
const { RequestError } = require('../utils/errors');
const { errorTypes } = require('../utils/common');

const createPostService = async (data) => {
  if (typeof data.message !== 'string' || data.message.length > 100) {
    throw new RequestError(errorTypes.VALIDATION_ERROR);
  }

  const userData = {
    _userId: data._userId,
    message: data.message,
  };

  await savePost(userData);
};

const getUserPostsService = async (id) => {
  const userPosts = await getUserPosts(id);

  return userPosts.map((post) => ({
    id: post._id,
    message: post.message,
    date: post.date,
  }));
};

module.exports = { createPostService, getUserPostsService };