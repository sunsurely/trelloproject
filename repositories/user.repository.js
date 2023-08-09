const User = require('../models/user');

class UserRepo {
  createUser = async (email, name, hash) => {
    const createUserResult = await User.create({
      email,
      name,
      password: hash,
    });

    return createUserResult;
  };
}

module.exports = UserRepo;
