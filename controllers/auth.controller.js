const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.loginController = async (req, res, next) => {
  try {
    if (res.locals.isLoggedIn) {
      return res.status(400).json({ errorMessage: '이미 로그인 중입니다.' });
    }
    passport.authenticate('local', (passportError, user, info) => {
      if (passportError) {
        return res.status(400).json({ reason: info });
      }
      req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          return res.status(400).json({ errorMessage: loginError });
        }
        const token = jwt.sign({ isLoggedIn: user }, process.env.COOKIE_SECRET);

        // res.cookie('authorization', `Bearer ${token}`);
        return res
          .status(200)
          .json({ message: '로그인 되었습니다.', jwtToken: `Bearer ${token}` });
      });
    })(req, res, next);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.logoutController = (req, res) => {
  try {
    if (!res.locals.isLoggedIn) {
      return res.status(400).json({ errorMessage: '로그인 상태가 아닙니다' });
    }
    //클라이언트에서 직접 토큰 삭제  -localStorage.removeItem('authorization')
    res.status(200).json({ message: '로그아웃 되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};
