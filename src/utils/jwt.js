/**
 * reference: https://www.npmjs.com/package/jsonwebtoken
 */

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || "my-secret-is-you";

/**
 * GenerateToken - generate new jwt token for user. will expire after 7d
 * @param {Object} payload
 * @param {string} payload.UserID
 * @returns 
 */
exports.GenerateToken = function(payload) {
  return jwt.sign({
    UserID: payload.UserID,
  }, secret, { expiresIn: "7d"});
}

/**
 * VerifyToken - verify jwt token, return payload
 * @param {string} token 
 * @returns 
 */
exports.VerifyToken = function(token) {
  return jwt.verify(token, secret);
}

exports.Authenticate = function(req, res, next) {
  const token = req.headers["authorization"];
  try {
    const payload = jwt.verify(token, secret);
    if (payload) {
      req.auth = payload;
      return next();
    }
  } catch (error) {
    console.log('[Authenticate] ERROR :>> ', error.message);
  }
  res.status(401).json({message: "unauthorized"});
}