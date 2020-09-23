/* eslint-disable consistent-return */
/* eslint-disable func-names */
import jwt from 'jsonwebtoken';

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Verify token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const secret = process.env.jwtSecret;
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
