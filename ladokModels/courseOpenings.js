const path = require('path');

const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
      openingCode: DataTypes.INTEGER,
    });

    // creates n-n relation
  Model.associate = function (models) {
    this.hasMany(models.Grade);
  }

  return Model;
};
