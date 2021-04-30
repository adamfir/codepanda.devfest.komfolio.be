module.exports = {
  schema: `
    extend type Query {
      User(
        ID: String!
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
      Address: String
      ProfileImage: String
      BackgroundImage: String
    }
  `,
  resolvers: {}
};