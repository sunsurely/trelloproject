const express = require('express');
const upload = require('../middlewares/multer');
const fs = require('fs');

const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/authAdmin');
const {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require('../controllers/menus.controller');
// const { customMulter } = require('../middlewares/customizedMulter');
try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

router.get('/:storeId/menus', getMenu);
router.post(
  '/:storeId/menus',
  //   isSignedIn,
  //   isAdmin,
  //   fields의 파라미터에 가변적으로 조절할 수 있는 부분 만들기
  upload.fields([
    { name: 'menuImage0' },
    { name: 'menuImage1' },
    { name: 'menuImage2' },
  ]),
  //   customMulter,
  createMenu
); // 요 부분 isAdmin 없어서 추가
router.put(
  '/:storeId/menus/:menuId',
  //  isSignedIn,
  //   isAdmin,
  upload.single('image'),
  updateMenu
);
router.delete(
  '/:storeId/menus/:menuId',
  //  isSignedIn,
  //   isAdmin,
  deleteMenu
);

module.exports = router;
