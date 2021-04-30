const { db } = require("../models");
const skillResolver = require("../resolver/skill");

module.exports = {
  schema: `
    extend type Mutation {
      AddSkill(
        Title: String!
        Rate: Int!
      ): Skill
      UpdateSkill(
        ID: String!
        Title: String
        Rate: Int
      ): Skill
    }
    extend type Query {
      Skills(
        UserID: String!
      ): [Skill]
    }
    type Skill {
      ID: String
      Title: String
      Rate: Int
      User: User
    }
  `,
  resolvers: {
    Mutation: {
      AddSkill: skillResolver.AddSkill,
      UpdateSkill: skillResolver.UpdateSkill,
    },
    Query: {
      Skills: skillResolver.Skills,
    },
    Skill: {
      User: async (parent, args, context, info) => {
        const filter = {
          where: {
            ID: parent.UserID,
          }
        }
        try {
          const user = await db["user"].findOne(filter);
          return user;
        } catch (error) {
          console.log('[Skill->User] ERROR findOne(filter) :>> ', error);
          return null;
        }
      }
    }
  }
};