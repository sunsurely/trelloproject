const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserRepo {
  createUser = async (email, name, hash, content) => {
    const createUserResult = await User.create({
      email,
      name,
      password: hash,
      content,
    });

    return createUserResult;
  };

  getUser = async (email) => {
    const getUserResult = await User.findOne({
      where: { email },
    });
    return getUserResult;
  };

  modifyUser = async (userId, content) => {
    const modifyUserResult = await User.update(
      {
        content,
      },
      { where: { userId } },
    );
    return modifyUserResult;
  };

  deleteUser = async (userId, password) => {
    const user = await User.findOne({ where: { userId } });
    const userPassword = user.password;

    const isPasswordValid = await bcrypt.compare(password, userPassword);

    if (!isPasswordValid) {
      return null;
    }

    const deleteUserResult = await User.destroy({
      where: { userId },
    });

    return deleteUserResult;
  };
}

module.exports = UserRepo;
