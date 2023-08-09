const User = require('../models/user');

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

  modifyUser = async (userId, email, content) => {
    const modifyUserResult = await User.update(
      {
        email,
        content,
      },
      { where: { userId } },
    );
    return modifyUserResult;
  };
}

module.exports = UserRepo;
