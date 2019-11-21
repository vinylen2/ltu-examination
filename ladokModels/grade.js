const path = require('path');

// gets tablename from filename
const tableName = path.basename(__filename, '.js');

// create model and export
module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
      examNumber: DataTypes.STRING,
      date: DataTypes.DATE,
      grade: DataTypes.STRING,
    });

  // creates 1-1 relation
  Model.associate = function (models) {
    this.belongsTo(models.Student);
    this.belongsTo(models.CourseOpenings);
  };

  return Model;
};
