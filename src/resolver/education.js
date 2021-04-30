const { db } = require("../models");
const { VerifyToken } = require("../utils/jwt");

exports.AddEducation = async (parent, args, context, info) => {
  console.log('parent, args, context, info :>> ', parent, args, context, info);
  // validate auth
  try {
    VerifyToken(context.token);
  } catch (error) {
    return new Error("unauthorized")
  }

  const newEducation = {
    Organization: args.Organization,
    Description: args.Description,
    StartDate: args.StartDate,
    EndDate: args.EndDate,
    UserID: context.UserID,
  }

  // insert into DB
  try {
    const education = await db["education"].create(newEducation);
    return education;
  } catch (error) {
    console.log('[AddEducation] ERROR create(newEducation) :>> ', error.message);
    return new Error("unknown error", error.message);
  }
}

exports.UpdateEducation = async (parent, args, context, info) => {
  // validate auth
  try {
    VerifyToken(context.token);
  } catch (error) {
    return new Error("unauthorized")
  }

  // filter by id
  const filter = {
    where: {
      ID: args.ID,
      UserID: context.UserID,
    },
  }

  // fetch current data
  let edu;
  try {
    edu = await db["education"].findOne(filter);
  } catch (error) {
    console.log('[UpdateEducation] ERROR findOne(filter) :>> ', error.message);
    return new Error("unknown error (1)");
  }

  if (!edu) {
    return new Error("not found");
  }

  if (args.Organization) {
    edu.Organization = args.Organization;
  }
  if (args.Description) {
    edu.Description = args.Description;
  }
  if (args.StartDate) {
    edu.StartDate = args.StartDate;
  }
  if (args.EndDate) {
    edu.EndDate = args.EndDate;
  }

  try {
    await edu.save();
    return edu;
  } catch (error) {
    console.log('[UpdateEducation] ERROR edu.save() :>> ', error.message);
    return new Error("unknown error (2)");
  }
}

exports.Educations = async (parent, args, context, info) => {
  const filter = {
    where: {
      UserID: args.UserID
    }
  }

  try {
    const educations = await db["education"].findAll(filter);
    return educations;
  } catch (error) {
    console.log('[Educations] ERROR edu.findAll() :>> ', error.message);
    return new Error("unknown error");
  }
}