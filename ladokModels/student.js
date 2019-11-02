const path = require('path');

const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      SSN: DataTypes.INTEGER,
      email: DataTypes.STRING,
    });

  // creates n-n relation
  Model.associate = function (models) {
    this.hasMany(models.Grade);
  };

  return Model;
};
