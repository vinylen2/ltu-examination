
const path = require('path');

const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
    courseCode: DataTypes.STRING,
    name: DataTypes.STRING,
  });

  Model.associate = function (models) {
    this.hasOne(models.ApplicationCode);
  };

  return Model;
};
