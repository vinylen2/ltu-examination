const path = require('path');

// gets tablename from filename
const tableName = path.basename(__filename, '.js');

// creates model and exports it
module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
    applicationCode: DataTypes.STRING,
  });

  // creates m-m association
  Model.associate = function (models) {
    this.belongsToMany(models.Term, { through: 'TermApplicationCodes'});
    this.belongsToMany(models.CourseCode, { through: 'CourseApplicationCodes'});
  };

  return Model;
};
