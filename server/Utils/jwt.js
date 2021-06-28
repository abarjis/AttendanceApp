const jwt = require('jsonwebtoken');
const jwtSign = (id) => {
  return jwt.sign({ id }, 'attendance', {
    expiresIn: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = jwtSign;