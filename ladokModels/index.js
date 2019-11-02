// Index file to read models dynamically from dir ./models

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config.json').ladok;

// creates connection to db from config.json
const connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.extra,
);
const db = {};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// load models from directory automatically
fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    const model = connection.import(path.join(__dirname, file));
    db[capitalizeFirstLetter(model.name)] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.connection = connection;
db.Sequelize = Sequelize;

module.exports = db;
