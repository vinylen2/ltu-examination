
const path = require('path');

// gets tablename from filename
const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
    courseCode: DataTypes.STRING,
    name: DataTypes.STRING,
  });

  // creates 1-1 association
  // Model.associate = function (models) {
  //   this.hasOne(models.ApplicationCode);
  // };
  Model.associate = function (models) {
    this.belongsToMany(models.ApplicationCode, { through: 'CourseApplicationCodes'});
  };

  return Model;
};
