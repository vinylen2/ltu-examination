const path = require('path');

// gets tablename from filename
const tableName = path.basename(__filename, '.js');

// creates model and exports
module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
      openingCode: DataTypes.INTEGER,
    });

    // creates m-m relation
  Model.associate = function (models) {
    this.hasMany(models.Grade);
  }

  return Model;
};
