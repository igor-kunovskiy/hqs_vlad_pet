const User = require('../model/user');

const { DataBaseError, RequestError } = require('../utils/errors');
const { errorTypes } = require('../utils/common');

const saveUser = async userData => {
  const user = new User(userData);
  try {
    await user.save();
  } catch (err) {
    if (err.code === 11000) {
      throw new DataBaseError(errorTypes.DUPLICATE_RECORD);
    } else {
      throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
    }
  }
};

const findUser = async userData => {
  try {
    return User.findOne(userData);
  } catch (err) {
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

const getUsers = async () => {
  try {
    return User.find({});
  } catch (err) {
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

const getTokens = async id => {
  try {
    return await User.find({ _id: { $ne: id } }, { pushToken: 1 });
  } catch (err) {
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

const getUserProfile = async id => {
  try {
    return await User.findById(id);
  } catch (err) {
    if (err.name === 'CastError') {
      throw new RequestError(errorTypes.INVALID_DATA);
    }
    throw new DataBaseError(errorTypes.INTERNAL_DB_ERROR);
  }
};

module.exports = { saveUser, findUser, getUsers, getTokens, getUserProfile };