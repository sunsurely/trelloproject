const bcrypt = require('bcrypt');

const { User } = require('../models');

const signupController = async (req, res, next) => {
  const { email, name, password, confirm } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  try {
    if (!email) {
      return res.status(400).json({ errorMessage: 'email을 입력해주세요' });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(412)
        .json({ errorMessage: '이메일 형식이 올바르지 않습니다.' });
    }
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res
        .status(400)
        .json({ errorMessage: '사용할 수 없는 이메일입니다.' });
    }
    if (!name) {
      return res.status(400).json({ errorMessage: 'name을 입력해 주세요' });
    }
    if (!password) {
      return res.status(400).json({ errorMessage: '비밀번호를 입력해 주세요' });
    }
    if (!confirm) {
      return res
        .status(400)
        .json({ errorMessage: '비밀번호 확인을 입력해 주세요' });
    }

    if (password !== confirm) {
      return res.status(400).json({
        errorMessage: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
      });
    }
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      name,
      password: hash,
    });
    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = signupController;
