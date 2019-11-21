
const path = require('path');

// gets tablename from filename
const tableName = path.basename(__filename, '.js');

// create model and export
module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
    courseCode: DataTypes.STRING,
    name: DataTypes.STRING,
  });

  // creates m-m association
  Model.associate = function (models) {
    this.belongsToMany(models.ApplicationCode, { through: 'CourseApplicationCodes'});
  };

  return Model;
};
