const { db } = require("../models");
const educationResolver = require("../resolver/education");

module.exports = {
  schema: `
    extend type Mutation {
      AddEducation(
        Organization: String!
        Description: String!
        StartDate: String!
        EndDate: String
      ): Education
      UpdateEducation(
        ID: String
        Organization: String
        Description: String
        StartDate: String
        EndDate: String
      ): Education
    }
    extend type Query {
      Educations(
        UserID: String!
      ): [Education]
    }
    type Education {
      ID: String
      Organization: String
      Description: String
      StartDate: String
      EndDate: String
      User: User
    }
  `,
  resolvers: {
    Mutation: {
      AddEducation: educationResolver.AddEducation,
      UpdateEducation: educationResolver.UpdateEducation,
    },
    Query: {
      Educations: educationResolver.Educations,
    },
    Education: {
      StartDate(parent, args, context, info) {
        return new Date(parent.StartDate).toISOString();
      },
      EndDate(parent, args, context, info) {
        if (!parent.EndDate) {
          return null
        }
        return new Date(parent.EndDate).toISOString();
      },
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
          console.log('[Education->User] ERROR findOne(filter) :>> ', error);
          return null;
        }
      }
    }
  }
};