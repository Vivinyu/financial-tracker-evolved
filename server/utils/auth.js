const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },

signToken: function ({ username, email, _id }) {
  const payload = { username, email, _id };
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
},
};