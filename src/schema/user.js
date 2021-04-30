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
    }
  `,
  resolvers: {
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
      }
    }
  }
};