const UserService = require('../services/user.service');
const { catchError } = require('../utils/catchErrorUtil');

class UserController {
  userService = new UserService();
  createUser = async (req, res) => {
    const { email, name, password, confirm, content } = req.body;

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
      catchError(err, 'userController_createUser');
    }
  };

  getUser = async (req, res) => {
    try {
      const email = req.body.email;
      const getUserResult = await this.userService.getUser(email);
      res.status(200).json({ success: true, data: getUserResult });
    } catch (err) {
      catchError(err, 'userController_getUser');
    }
  };

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
      catchError(err, 'userController_modifyUser');
    }
  };

  deleteUser = async (req, res) => {
    try {
      const userId = res.locals.userId;
      const { password } = req.body;
      const deleteUserResult = await this.userService.deleteUser(
        userId,
        password,
      );

      res.status(402).json({ sucess: true, deleteUserResult });
    } catch (err) {
      catchError(err, 'userController_deleteUser');
    }
  };
}

module.exports = UserController;
