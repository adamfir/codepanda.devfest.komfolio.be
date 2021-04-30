const authResolver = require("../resolver/auth");

module.exports = {
  schema: `
    extend type Mutation {
      Register(
        Name: String!
        Email: String!
        Phone: String!
        Password: String!
        BirthDate: String!
      ): AuthToken
      Login(
        Email: String!
        Password: String!
      ): AuthToken
    }
    type AuthToken {
      Token: String
    }
  `,
  resolvers: {
    Mutation: {
      Register: authResolver.Register,
      Login: authResolver.Login,
    }
  }
};