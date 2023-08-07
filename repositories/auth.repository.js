const User = require('../models/user');

class AuthRepo {
  findByEmail = async email => {
    try {
      const existEmail = await User.findOne({ where: { email: email } });
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

  findByNickname = async nickname => {
    try {
      const existNickname = await User.findOne({
        where: { nickname: nickname },
      });
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

  createUser = async (userInfoInJson) => {
    try {
      await User.create(userInfoInJson);
      return true;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);

      return false;
    }
  };
//   createUser = async (
//     name,
//     nickname,
//     phoneNumber,
//     email,
//     password,
//     location
//   ) => {
//     try {
//       await User.create({
//         name,
//         nickname,
//         phoneNumber,
//         email,
//         password,
//         location,
//       });
//       return true;
//     } catch (err) {
//       console.error(`Error path: ${__dirname}${__filename}`);
//       console.error(err);

//       return false;
//     }
//   };
}

module.exports = AuthRepo;
