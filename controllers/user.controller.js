const UserService = require('../services/user.service');
<<<<<<< HEAD
const { catchError } = require('../utils/catchErrorUtil');
=======
const MakeError = require('../utils/makeErrorUtil');
>>>>>>> a8fd3a494a76e60e15d9f4b85dad9634215af6dc

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
<<<<<<< HEAD
    } catch (error) {
      catchError(err, 'userController_createUser');
=======
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.error('UserController_createUser', err);
      res.status(500).json({ message: 'Server Error' });
>>>>>>> a8fd3a494a76e60e15d9f4b85dad9634215af6dc
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
