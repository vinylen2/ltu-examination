const path = require('path');

const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
      openingCode: DataTypes.INTEGER,
      courseCode: DataTypes.STRING,
    });

    // creates n-n relation
  Model.associate = function (models) {
    this.belongsToMany(models.Student, { through: 'StudentCourses' });
  }

  return Model;
};
