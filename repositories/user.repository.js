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

  getUser = async (userId) => {
    const getUserResult = await User.findOne({
      where: userId,
    });
    return getUserResult;
  };
}

module.exports = UserRepo;
