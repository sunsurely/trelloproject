const UserRepo = require('../repositories/user.repository');
const { MakeError } = require('../utils/makeErrorUtil');

class UserService {
  userRepo = new UserRepo();

  createUser = async (email, name, hash) => {
    try {
      const createUserResult = await this.userRepo.createUser(
        email,
        name,
        hash,
      );
      if (!createUserResult) {
        throw new MakeError('402', '유저등록에 실패했습니다.');
      }

      return createUserResult;
    } catch (err) {
      console.error('UserService_createUser', err);
      throw err;
    }
  };
}

module.exports = UserService;
