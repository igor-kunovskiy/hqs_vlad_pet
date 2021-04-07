const httpStatusCodes = require('http-status-codes').StatusCodes;
const jwt = require('../utils/jwt');
const {
  initUserService,
  authUserService,
  getUserProfileService,
  getUsersService,
} = require('../services/user');

const initUser = async (req, res) => {
  try {
    await initUserService(req.body);
    res.sendStatus(httpStatusCodes.CREATED);
  } catch (err) {
    res.sendStatus(err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const authUser = async (req, res) => {
  try {
    const user = await authUserService(req.body);
    res.status = httpStatusCodes.OK;
    res.send({ token: jwt.encode({ email: user.email, _id: user._id }) });
  } catch (err) {
    res.sendStatus(err.httpStatus || httpStatusCodes.UNAUTHORIZED);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userProfile = await getUserProfileService(req.params.id);
    res.send(userProfile);
  } catch (err) {
    res.sendStatus(err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await getUsersService();
    res.send(users);
  } catch (err) {
    res.sendStatus(err.httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    req.locals = {};
    req.locals.user = jwt.decode(req.headers.authorization);
    next();
  } catch (err) {
    res.sendStatus(httpStatusCodes.UNAUTHORIZED);
  }
};

module.exports = { initUser, authUser, verifyUser, getUserProfile, getUsers };