const { db } = require("../models");
const userResolver = require("../resolver/user");
module.exports = {
  schema: `
    extend type Query {
      User(
        ID: String!
      ): User
    }
    extend type Mutation {
      User(
        Name: String
        Phone: String
        Line: String
        Description: String
        BirthDate: String
        Address: String
      ): User
    }
    type User {
      ID: String
      Name: String
      Email: String
      Phone: String
      Line: String
      Description: String
      BirthDate: String
      Age: Int
      Address: String
      ProfileImage: String
      BackgroundImage: String
      Skills: [Skill]
    }
  `,
  resolvers: {
    Query: {
      User: userResolver.GetUser,
    },
    Mutation: {
      User: userResolver.UpdateUser,
    },
    User: {
      BirthDate(parent, args, context, info) {
        const isoString = new Date(parent.BirthDate).toISOString();
        return isoString;
      },
      Age(parent, args, context, info) {
        if (!parent || !parent.BirthDate) {
          return null;
        }

        const now = new Date();
        const birthDate = new Date(parent.BirthDate);
        const age = now.getFullYear() - birthDate.getFullYear();
        const month = now.getMonth() - birthDate.getMonth();
        if (month < 0 || month === 0 && now.getDate() < birthDate.getDate()) {
          return age - 1;
        }
        return age;
      },
      Skills: async function(parent, args, context, info) {
        const filter = {
          where: {
            UserID: parent.ID,
          }
        }

        try {
          const skills = await db["skill"].findAll(filter);
          return skills;
        } catch (error) {
          console.log('[User->Skills] ERROR findAll(filter) :>> ', error.message);
          return null;
        }
      }
    }
  }
};