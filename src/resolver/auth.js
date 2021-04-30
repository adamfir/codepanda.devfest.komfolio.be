const { Op } = require("sequelize");
const { db } = require("../models");
const { GenerateToken } = require("../utils/jwt");
const { HashPassword, ComparePassword } = require("../utils/password")

/**
 * Register use to create new user.
 * 
 * @param {Object} parent
 * @param {Object} args hold mutation Register value from schema/auth.js
 * @param {String} args.Name
 * @param {String} args.Email
 * @param {String} args.Phone
 * @param {String} args.Password
 * @param {String} args.BirthDate
 * @param {Object} context hold request context
 * @param {String} context.token
 * @param {String} context.UserID
 * @param {Object} info hold extra information about graphql request
 * @returns AuthToken
 */
exports.Register = async function (parent, args, context, info) {
  // check if email or phone already used
  const filter = {
    where: {
      [Op.or]: {
        Email: args.Email,
        Phone: args.Phone,
      }
    },
    limit: 1,
  };
  try {
    const count = await db["user"].count(filter);
    if (count > 0) {
      return new Error("email or phone already used");
    }
  } catch (error) {
    console.log('[Register] ERROR Count(filter) :>> ', error);
    return new Error(`unknown error, ${error.message}`);
  }

  // hash password
  const hashedPassword = HashPassword(args.Password);

  // INSERT user
  let user;
  try {
    user = await db["user"].create({
      Name: args.Name,
      Email: args.Email,
      Phone: args.Phone,
      BirthDate: args.BirthDate,
      Password: hashedPassword,
    });
  } catch (error) {
    console.log('[Register] ERROR :>> ', error);
    return new Error(`cannot register, ${error.message}`);
  }
  
  // generate new JWT for user
  const newToken = GenerateToken({
    UserID: user.ID
  });

  // return final object for register
  return {
    Token: newToken,
  }
}

/**
 * Login use to validate email & password and give auth token.
 * 
 * @param {Object} parent
 * @param {Object} args hold mutation Login value from schema/auth.js
 * @param {String} args.Email
 * @param {String} args.Password
 * @param {Object} context hold request context
 * @param {String} context.token
 * @param {String} context.UserID
 * @param {Object} info hold extra information about graphql request
 * @returns AuthToken
 */
exports.Login = async function (parent, args, context, info) {
  // hash password
  const hashedPassword = HashPassword(args.Password);

  // fetch user based on email
  const filter = {
    where: {
      Email: args.Email
    }
  }

  let user;
  try {
    user = await db["user"].findOne(filter);
  } catch (error) {
    console.log('[Login] ERROR findOne(filter) :>> ', error);
    return new Error("login failed, please try again", error.message);
  }

  if (!user) { // user not found
    return new Error("invalid email or password");
  }

  // compare password
  const isVald = ComparePassword(args.Password, user.Password);
  if (!isVald) {
    return new Error("invalid email or password");
  }
  
  // generate new JWT
  const token = GenerateToken({
    UserID: user.ID,
  })

  return {
    Token: token,
  }
}