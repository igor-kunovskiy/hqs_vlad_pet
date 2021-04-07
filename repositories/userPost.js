const Post = require('../model/userPost');

const { DataBaseError } = require('../utils/errors');
const { errorTypes } = require('../utils/common');

const savePost = async (postData) => {
  const post = new Post(postData);
  try {
    await post.save();
  } catch (err) {
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

const getUserPosts = async (id) => {
  try {
    return await Post.find({ _userId: id });
  } catch (err) {
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

module.exports = { savePost, getUserPosts };