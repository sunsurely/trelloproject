const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

require('dotenv').config();

const { User } = require('../models');

const localConfig = { usernameField: 'email', passwordField: 'password' };

const localVerify = async (email, password, done) => {
  try {
    if (!email) {
      done(null, false, { message: '이메일을 입력해주세요' });
      return;
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      done(null, false, { message: '존재하지 않는 사용자 입니다.' });
      return;
    }
    if (!password) {
      done(null, false, { message: '비밀번호를 입력해주세요.' });
      return;
    }
    const compareResult = await bcrypt.compare(password, user.password);

    if (compareResult) {
      done(null, user);
      return;
    }
    done(null, false, { message: '올바르지 않은 비밀번호입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

module.exports = () => {
  passport.use('local', new LocalStrategy(localConfig, localVerify));
};
