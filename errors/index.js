const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found-error');
const UnauthorizedError = require('./unauthorized');
const ConflictError = require('./conflict');
const ForbiddenError = require('./forbidden');

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  ForbiddenError,
};
