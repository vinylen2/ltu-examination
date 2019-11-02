const path = require('path');

// gets tablename from filename
const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
    term: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
  });


  Model.associate = function (models) {
    this.belongsToMany(models.ApplicationCode, { through: 'TermApplicationCodes'});
  };

  return Model;
};
