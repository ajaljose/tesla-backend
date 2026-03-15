const User = require('../../models/user/user.model');

exports.createUser = async (data) => {
  console.log('Creating user with data:', data);
  return User.create(data);
};

exports.getAllUsers = async () => {
  return User.findAll();
};

exports.getUserById = async (id) => {
  return User.findByPk(id);
};

