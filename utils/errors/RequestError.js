const httpStatusCodes = require('http-status-codes').StatusCodes;
const errorTypes = require('../common').errorTypes;

class RequestError extends Error {
  constructor(code) {
    super();

    this.httpStatus = 200;

    switch (code) {
      case errorTypes.DUPLICATE_COMMENT:
        this.httpStatus = httpStatusCodes.LOCKED;
        break;
      case errorTypes.REQUIRED_PARAMS:
        this.httpStatus = httpStatusCodes.BAD_REQUEST;
        break;
      case errorTypes.VALIDATION_ERROR:
        this.httpStatus = httpStatusCodes.BAD_REQUEST;
        break;
      case errorTypes.INVALID_AUTH:
        this.httpStatus = httpStatusCodes.UNAUTHORIZED;
        break;
      case errorTypes.INVALID_DATA:
        this.httpStatus = httpStatusCodes.BAD_REQUEST;
        break;
      default:
        this.httpStatus = httpStatusCodes.BAD_REQUEST;
        break;
    }
  }
}

module.exports = RequestError;
