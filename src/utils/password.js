const bcrypt = require('bcryptjs');

/**
 * HashPassword hash plain text using bcrypt
 * @param {string} plain - password in plain text
 * @returns 
 */
exports.HashPassword = function (plain) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plain, salt);
}

/**
 * ComparePassword compare between plain password with hashed password stored in database
 * @param {string} plain - password in plaintext
 * @param {string} hash - stored password from database
 * @returns 
 */
exports.ComparePassword = function (plain, hash) {
  return bcrypt.compareSync(plain, hash);
}