
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require("graphql-tools");
const allSchema = require("./schema");

module.exports = graphqlHTTP((req) => {
  const context = {};
  if (req.header("Authorization")) {
    context.token = req.header("Authorization");
    const token = context.token.split(" ")[1];
    let parsedToken = {};
    if (token) {
      try {
        parsedToken = JSON.parse(
          Buffer.from(token.split(".")[1], "base64").toString()
        );
        context.userId = parsedToken.id;
      } catch {}
    }
  }
  return {
    schema: makeExecutableSchema({
      typeDefs: allSchema.schema,
      resolvers: allSchema.resolvers,
    }),
    context,
    graphiql: true,
  };
});
