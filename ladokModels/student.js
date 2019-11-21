const path = require('path');

// gets tablename from filename
const tableName = path.basename(__filename, '.js');

// create model and export
module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      SSN: DataTypes.INTEGER,
      email: DataTypes.STRING,
    });

  // creates 1-m relation
  Model.associate = function (models) {
    this.hasMany(models.Grade);
  };

  return Model;
};
