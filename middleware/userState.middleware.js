const jwt = require('jsonwebtoken');
const CollaboratorCaching = require('../cache');
const collaboratorCaching = new CollaboratorCaching();

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
// ("url", auth, isInvitedByPermission, apiFunction)
// exports.isInvitedByPermission = (permission) => {
//   const isInvited = async (req, res, next) => {
//     const userId = res.locals.userId;
//     try {
//       if (isNaN(userId) || userId < 1) {
//         return {
//           status: 400,
//           sucess: false,
//           message: '초대된 유저만 사용가능합니다.',
//         };
//       }

//       const invited = await collaboratorCaching.getCachedCollaborator(userId);
//       if (!invited) {
//         return {
//           status: 400,
//           sucess: false,
//           message: '초대된 유저만 사용가능합니다.',
//         };
//       }

//       const permission = invited.permission;
//       if (permission === `owner`) {
//         next();
//       }
//     } catch (err) {
//       console.log(error);
//       res.status(400).json({ errorMessage: '잘못된 접근입니다.' });
//     }
//   };

//   return isInvited;
// };

// permission에 표기된 접근권한을 가진 사용자만 next()
// 입력 예시: isInvitedByPermission("owner", "write", "readonly")
// 미들웨어 이름 availablePermission 어떤가요?
exports.isInvitedByPermission = (...permissions) => {
  return async (req, res, next) => {
    const userId = res.locals.userId;
    if (isNaN(userId) || userId < 1) {
      return res
        .status(400)
        .json({ message: '초대된 유저만 사용 가능합니다.' });
    }

    try {
      const invited = await collaboratorCaching.getChachedCollaborator(userId);
      if (!invited) {
        return res
          .status(400)
          .json({ message: '초대된 유저만 사용 가능합니다.' });
      }

      for (permission of permissions) {
        if (invited.permission !== permission) {
          return res.status(400).json({ message: '접근 권한이 없습니다.' });
        }
      }
    } catch (err) {
      console.error(`Error path: ${__filename}`);
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error ' });
    }
  };
  // const isInvited = async (req, res, next) => {
  //   const userId = res.locals.userId;
  //   try {
  //     if (isNaN(userId) || userId < 1) {
  //       return {
  //         status: 400,
  //         sucess: false,
  //         message: '초대된 유저만 사용가능합니다.',
  //       };
  //     }

  //     const invited = await collaboratorCaching.getCachedCollaborator(userId);
  //     if (!invited) {
  //       return {
  //         status: 400,
  //         sucess: false,
  //         message: '초대된 유저만 사용가능합니다.',
  //       };
  //     }

  //     const permission = invited.permission;
  //     if (permission === `owner`) {
  //       next();
  //     }
  //   } catch (err) {
  //     console.log(error);
  //     res.status(400).json({ errorMessage: '잘못된 접근입니다.' });
  //   }
  // };

  // return isInvited;
};
