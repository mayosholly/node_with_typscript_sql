import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import process from 'process';

const basename = path.basename(__filename);
const env: string = process.env.NODE_ENV || 'development';
const config: any = require(path.join(__dirname, '/../config/config.json'))[env];

const db: any = {};

let sequelize: any;

if (config.use_env_variable) {
  const envVariable = process.env[config.use_env_variable];
  if (!envVariable) {
    throw new Error(`Environment variable ${config.use_env_variable} is not set.`);
  }
  sequelize = new Sequelize(envVariable, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file)).default(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
