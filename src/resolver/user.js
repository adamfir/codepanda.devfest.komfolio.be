const { VerifyToken } = require("../utils/jwt");
const { db } = require("../models");

exports.UpdateUser = async function (parent, args, context, info) {
  // validate auth
  try {
    VerifyToken(context.token);
  } catch (error) {
    return new Error("unauthorized")
  }

  // filter by UserID
  const filter = {
    where: {
      ID: context.UserID,
    }
  }

  // fetch existing data
  let user;
  try {
    user = await db["user"].findOne(filter);
  } catch (error) {
    console.log('[UpdateUser] ERROR :>> findOne()', error);
    return new Error("unknown error", error.message);
  }

  // compose update payload
  if (args.Name) {
    user.Name = args.Name;
  }
  if (args.Phone) {
    user.Phone = args.Phone;
  }
  if (args.Line) {
    user.Line = args.Line;
  }
  if (args.Description) {
    user.Description = args.Description;
  }
  if (args.BirthDate) {
    user.BirthDate = args.BirthDate;
  }
  if (args.Address) {
    user.Address = args.Address;
  }

  // execute update
  try {
    await db["user"].update(user, filter);
    return user;
  } catch (error) {
    console.log('[UpdateUser] ERROR :>> update()', error);
    return new Error("unknown error", error.message);
  }
}