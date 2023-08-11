const jwt = require('jsonwebtoken');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 0, checkperiod: 120 });

exports.authorizated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ errorMessage: '권한이 존재하지 않습니다.' });
  }
  const [authType, authToken] = (authorization ?? '').split(' ');

  if (authType !== 'Bearer' || !authToken) {
    return res.status(403).json({ errorMessage: '로그인이 필요한 기능입니다' });
  }

  try {
    const { user } = jwt.verify(authToken, process.env.COOKIE_SECRET);
    res.locals.userId = user.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: '잘못된 접근입니다.' });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.locals.isLoggedIn = false;
    next();
    return;
  }

  const [authType, authToken] = (authorization ?? '').split(' ');

  if (!authorization || authType !== 'Bearer' || !authToken) {
    res.locals.isLoggedIn = false;
    next();
    return;
  }

  try {
    const { user } = jwt.verify(authToken, process.env.COOKIE_SECRET);

    res.locals.isLoggedIn = true;
    res.locals.userId = user.userId;
    next();
  } catch (err) {
    console.error(err);
    res.locals.isLoggedIn = false;
    next();
  }
};

exports.isInvited = async (req, res, next) => {
  const userId = res.locals.userId;
  try {
    if (isNaN(userId) || userId < 1) {
      return {
        status: 400,
        sucess: false,
        message: '초대된 유저만 사용가능합니다.',
      };
    }

    const invitedUser = cache.get(process.env.invitedKey);
    if (!invitedUser) {
      return {
        status: 400,
        sucess: false,
        message: '초대된 유저만 사용가능합니다.',
      };
    }
    next();
  } catch (err) {
    console.log(error);
    res.status(400).json({ errorMessage: '잘못된 접근입니다.' });
  }
};
