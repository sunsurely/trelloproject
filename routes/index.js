const express = require('express');
const router = express.Router();
const cardRouter = require('./card.router');
const commentRouter = require('./comment.router');

const defaultRoutes = [
  {
    path: '/boards',
    route: cardRouter,
  },
  {
    path: '/boards',
    route: commentRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
