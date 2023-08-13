const UserRepo = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const MakeError = require('../utils/makeErrorUtil');

class UserService {
  userRepo = new UserRepo();

  createUser = async (email, name, password, confirm, content) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(email);
    try {
      if (!email) {
        throw new MakeError(400, 'email을 입력해주세요');
      }
      if (!emailRegex.test(email)) {
        throw new MakeError(400, '이메일 형식이 올바르지 않습니다.');
      }
      const exUser = await this.userRepo.getUser(email);
      if (exUser) {
        throw new MakeError(400, '사용할 수 없는 email입니다.');
      }
      if (!name) {
        throw new MakeError(400, 'name을 입력해 주세요');
      }
      if (!password) {
        throw new MakeError(400, '비밀번호를 입력해 주세요');
      }
      if (!confirm) {
        throw new MakeError(400, '비밀번호 확인을 입력해 주세요');
      }

      if (password !== confirm) {
        throw new MakeError(
          400,
          '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        );
      }
      const hash = await bcrypt.hash(password, 12);

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

  getUser = async (email) => {
    try {
      if (!email) {
        throw new MakeError(400, '잘못된 email입니다.');
      }
      const getUserResult = await this.userRepo.getUser(email);

      if (!getUserResult) {
        throw new MakeError(400, '해당하는 유저가 존재하지 않습니다.');
      }

      return getUserResult;
    } catch (err) {
      console.error('UserService_getUser', err);
      throw err;
    }
  };

  modifyUser = async (userId, content) => {
    try {
      if (!userId) {
        throw new MakeError(400, '잘못된 userId입니다.');
      }

      const modifyUserResult = await this.userRepo.modifyUser(userId, content);

      if (!modifyUserResult) {
        throw new MakeError(401, '회원정보 수정에 실패했습니다.');
      }

      return modifyUserResult;
    } catch (err) {
      console.error('UserService_modifyUser', err);
      throw err;
    }
  };

  deleteUser = async (userId, password) => {
    try {
      if (!userId) {
        throw new MakeError(400, '잘못된 유저ID입니다.');
      }
      if (!password) {
        throw new MakeError(400, '비밀번호가 필요합니다.');
      }

      const deleteUserResult = await this.userRepo.deleteUser(userId, password);
      if (!deleteUserResult) {
        throw new MakeError(400, '회원삭제실패');
      }

      return deleteUserResult;
    } catch (err) {
      console.error('UserService_deleteUser', err);
      throw err;
    }
  };
}

module.exports = UserService;
