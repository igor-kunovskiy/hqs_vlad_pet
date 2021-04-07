const { saveUser, findUser, getUserProfile, getUsers } = require('../repositories/user');
const validation = require('../utils/validation');

const { RequestError } = require('../utils/errors');
const { errorTypes } = require('../utils/common');

const initUserService = async (data) => {
  if (
    !validation.nameRegExp.test(data.name) ||
    !validation.passwordRegExp.test(data.password) ||
    !validation.emailRegExp.test(data.email)
  ) {
    throw new RequestError(errorTypes.VALIDATION_ERROR);
  }

  const userData = {
    name: data.name,
    email: data.email,
    password: data.password,
  };
  await saveUser(userData);
};

const authUserService = async (userData) => {
  const user = await findUser({ email: userData.email });
  const isMatch = await user.comparePassword(userData.password);

  if (isMatch) {
    return user;
  } else {
    throw new RequestError(errorTypes.INVALID_AUTH);
  }
};

const getUserProfileService = async (id) => {
  const userProfile = await getUserProfile(id);

  return {
    name: userProfile.name,
    email: userProfile.email,
    id: userProfile._id,
  }
};

const getUsersService = async () => {
  const users = await getUsers();
  return users.map((user) => ({
    name: user.name,
    email: user.email,
    id: user._id,
  }))
};

module.exports = { initUserService, authUserService, getUserProfileService, getUsersService };