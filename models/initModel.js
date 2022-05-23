const { User } = require('./usersModel');
const { Repair } = require('./repairsModel');

const initModel = () => {
  User.hasMany(Repair, { foreignKey: 'userId' });
  Repair.belongsTo(User);
};

module.exports = { initModel };
