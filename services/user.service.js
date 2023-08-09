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
        content,
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

  getUser = async (userId) => {
    try {
      const getUserResult = await this.UserService.getUser(userId);

      if (!getUserResult) {
        throw new MakeError(400, '해당하는 유저가 존재하지 않습니다.');
      }

      return getUserResult;
    } catch (err) {
      console.error('UserService_getUser', err);
      throw err;
    }
  };
}

module.exports = UserService;
