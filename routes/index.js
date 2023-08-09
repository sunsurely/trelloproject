const express = require('express');
const router = express.Router();

const cardRouter = require('./card.router');
const commentRouter = require('./comment.router');
const columnRouter = require('./column.router.js');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');

const defaultRoutes = [
  {
    path: '/boards',
    route: cardRouter,
  },
  {
    path: '/boards',
    route: commentRouter,
  },
  {
    path: '/boards',
    route: columnRouter,
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/user',
    route: userRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
