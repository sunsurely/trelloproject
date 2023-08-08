const express = require('express');
const router = express.Router();
const cardRouter = require('./card.router');
const commentRouter = require('./comment.router');
const authRouter = require('./auth.router');

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
    path: '/auth',
    route: authRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
