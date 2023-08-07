const AuthRepo = require('../repositories/auth.repository');
const bcrypt = require('bcrypt');

class AuthService {
  salt = 12;
  authRepo = new AuthRepo();
  validateEmail = email => {
    // 이메일 유효성 검사
  };

  verifyPassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
      return true;
    }

    return false;
  };

  checkEmailExist = async email => {
    try {
      const existEmail = this.authRepo.findByEmail(email);
      if (!existEmail) {
        return null;
      }
      return existEmail;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);
      return null;
    }
  };

  checkNicknameExist = async nickname => {
    try {
      const existNickname = this.authRepo.findByNickname(nickname);
      if (!existNickname) {
        return null;
      }
      return existNickname;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);
      return null;
    }
  };

  createUser = async userInfoInJson => {
    // userInfoInJson.password = bcrypt.hash(
    //   userInfoInJson.password,
    //   this.salt,
    //   (err, encryptedPW) => {
    //     console.log(err);
    //     console.log(encryptedPW);
    //   }
    // );
    userInfoInJson.password = bcrypt.hashSync(
      userInfoInJson.password,
      this.salt
    );
    try {
      const result = await this.authRepo.createUser(userInfoInJson);
      if (!result) {
        return false;
      }

      return true;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);
      return false;
    }
  };

  checkRegistered = async (email, password) => {
    const user = await this.authRepo.findByEmail(email);

    if (!user) {
      return false;
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return false;
    }

    return user;
  };
}

module.exports = AuthService;
