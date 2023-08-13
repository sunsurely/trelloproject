const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body.data;
    if (res.locals.isLoggedIn) {
      return res.status(400).json({ errorMessage: '이미 로그인 중입니다.' });
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ errorMessage: '존재하지 않는 사용자입니다' });
    }
    if (!password) {
      return res.status(400).json({ errorMessage: '비밀번호를 입력해 주세요' });
    }
    const compareResult = await bcrypt.compare(password, user.password);

    if (!compareResult) {
      return res
        .status(400)
        .json({ errorMessage: '비밀번호가 일치하지 않습니다' });
    }
    const token = jwt.sign({ user: user }, process.env.COOKIE_SECRET);
    res
      .status(200)
      .json({ message: '로그인되었습니다.', jwtToken: `Bearer ${token}` });
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

    res.status(200).json({ message: '로그아웃 되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};
