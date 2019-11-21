const path = require('path');

// gets tablename from filename
const tableName = path.basename(__filename, '.js');

// creates model and exports
module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
      openingCode: DataTypes.INTEGER,
      courseCode: DataTypes.STRING,
    });

    // creates m-m relation
  Model.associate = function (models) {
    this.belongsToMany(models.Student, { through: 'StudentCourses' });
  }

  return Model;
};
