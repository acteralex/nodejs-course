const Token = require('./token');
const { catcher } = require('./catcher');
const { HttpError } = require('./http.error');

const Authentication = catcher(async (req, res, next) => {
  const authHeaderValue = req.get('Authorization');
  if (authHeaderValue) {
    const [prefix, value] = authHeaderValue && authHeaderValue.split(' ');
    if (prefix === 'Bearer' && Token.isValid(value)) {
      // eslint-disable-next-line callback-return
      next();
    }
  }
  throw new HttpError(401);
});

module.exports = {
  Authentication
};
