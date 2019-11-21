const path = require('path');

// gets tablename from filename
const tableName = path.basename(__filename, '.js');

// create model and export
module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      SSN: DataTypes.INTEGER,
      idealId: DataTypes.STRING,
      email: DataTypes.STRING,
    });

  // creates m-m relation
  Model.associate = function (models) {
    this.belongsToMany(models.CourseOpenings, { through: 'StudentCourses' });
  };

  return Model;
};
