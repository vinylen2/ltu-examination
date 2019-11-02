const path = require('path');

const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
      examNumber: DataTypes.STRING,
      date: DataTypes.DATE,
      grade: DataTypes.STRING,
    });

  // creates n-n relation
  Model.associate = function (models) {
    this.belongsTo(models.Student);
    this.belongsTo(models.CourseOpenings);
  };

  return Model;
};
