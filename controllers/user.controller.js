const UserService = require('../services/user.service');

const { catchError } = require('../utils/catchErrorUtil');

class UserController {
  userService = new UserService();
  //회원가입
  createUser = async (req, res) => {
    const { email, name, password, confirm, content } = req.body.userData;

    try {
      const createUserResult = await this.userService.createUser(
        email,
        name,
        password,
        confirm,
        content,
      );

      return res.status(201).json({ success: true, data: createUserResult });
    } catch (error) {
      catchError(error, 'userController_createUser', res);
    }
  };
  //회원조회
  getUser = async (req, res) => {
    try {
      const email = req.body.email;
      const getUserResult = await this.userService.getUser(email);
      res.status(200).json({ success: true, data: getUserResult });
    } catch (err) {
      catchError(err, 'userController_getUser', res);
    }
  };
  //회원정보 수정
  modifyUser = async (req, res) => {
    try {
      const userId = res.locals.userId;
      const { content } = req.body;

      const modifyUserResult = await this.userService.modifyUser(
        userId,
        content,
      );

      res.status(200).json({ success: true, modifyUserResult });
    } catch (err) {
      catchError(err, 'userController_modifyUser', res);
    }
  };
  //회원삭제
  deleteUser = async (req, res) => {
    try {
      const userId = res.locals.userId;
      const { password } = req.body;
      await this.userService.deleteUser(userId, password);

      res.status(204).json({ sucess: true, message: '회원탈퇴' });
    } catch (err) {
      catchError(err, 'userController_deleteUser', res);
    }
  };
}

module.exports = UserController;
