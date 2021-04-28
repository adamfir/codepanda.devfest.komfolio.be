import Sequelize, { DataTypes } from 'sequelize';
const NODE_ENV = process.env.NODE_ENV
import { PROD, STG, DEV } from '../../config/sequelize';

// chose database config based on environment variable
let dbConfig;
if (NODE_ENV == "PROD") {
  dbConfig = PROD
} else if (NODE_ENV == "STG") {
  dbConfig = STG
} else {
  dbConfig = DEV
}

// include each model to sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
const models = [
  require("./user")(sequelize, DataTypes),
]

const db = {}

// bind models to db
for (let i = 0; i < models.length; i++) {
  db[models[i].name] = models[i];
}

// bind association
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;