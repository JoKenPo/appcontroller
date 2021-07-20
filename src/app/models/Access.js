
module.exports = (sequelize, DataTypes) => {
  const Access = sequelize.define("Access", {
    user_ip: DataTypes.STRING,
    path: DataTypes.STRING,
    method: DataTypes.STRING,
  }, {
    hooks: {}
  });

  return Access;
};