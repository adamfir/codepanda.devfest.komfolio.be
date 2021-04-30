const { VerifyToken } = require("../utils/jwt");
const { db } = require("../models");

exports.AddSkill = async function(parent, args, context, info) {
  // validate auth
  try {
    VerifyToken(context.token);
  } catch (error) {
    return new Error("unauthorized")
  }

  if (args.Rate > 5 || args.Rate < 0) {
    return new Error("invalid rate");
  }

  // compose object
  const newSkill = {
    Title: args.Title,
    Rate: args.Rate,
    UserID: context.UserID,
  }
  
  // insert into db
  try {
    const skill = await db["skill"].create(newSkill);
    return skill;
  } catch (error) {
    console.log('[AddSkill] ERROR create(newSkill) :>> ', error.message);
    return new Error("unknown error", error.message);
  }
}

exports.UpdateSkill = async function(parent, args, context, info) {
  // validate auth
  try {
    VerifyToken(context.token);
  } catch (error) {
    return new Error("unauthorized")
  }

  if (args.Rate && (args.Rate > 5 || args.Rate < 0)) {
    return new Error("invalid rate");
  }

  // filter by id
  const filter = {
    where: {
      ID: args.ID,
      UserID: context.UserID,
    },
  }

  // fetch current data
  let skill;
  try {
    skill = await db["skill"].findOne(filter);
  } catch (error) {
    console.log('[UpdateSkill] ERROR findOne(filter) :>> ', error.message);
    return new Error("unknown error (1)");
  }

  if (!skill) {
    return new Error("skill not found");
  }

  if (args.Title) {
    skill.Title = args.Title
  }
  if (args.Rate) {
    skill.Rate = args.Rate
  }

  // update db
  try {
    await skill.save();
    return skill;
  } catch (error) {
    console.log('[UpdateSkill] ERROR update(newSkill, filter) :>> ', error.message);
    return new Error("unknown error (2)", error.message);
  }
}

exports.Skills = async function(parent, args, context, info) {
  // filter by id
  const filter = {
    where: {
      UserID: args.UserID
    },
  }

  try {
    const skills = await db["skill"].findAll(filter);
    return skills;
  } catch (error) {
    console.log('[Skills] ERROR find(filter) :>> ', error.message);
    return new Error("unknown error");
  }
}