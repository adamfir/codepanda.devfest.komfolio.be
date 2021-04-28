const fs = require("fs");
const path = require("path");
const { merge } = require("lodash");
const basename = path.basename(__filename);

let schema = `
  type Query {
    _empty: String
  }
  type Mutation {
    _emptyUpdate(topic: String!): String
  }
`;
let resolvers = {};

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const schemaObj = require(`./${file}`); // eslint-disable-line global-require,import/no-dynamic-require
    resolvers = merge(resolvers, schemaObj.resolvers);
    schema += schemaObj.schema;
  });

module.exports = {
  schema,
  resolvers,
};
