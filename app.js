const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();
require('dotenv').config();

const cors = require('cors');
const mainRouter = require('./routes');
const { sequelize } = require('./models');
app.set('port', process.env.PORT || 3001);

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log('데이터베이스 연결 성공');
//   })
//   .catch((err) => {
//     console.error(err);
//   });

app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// // app.get("/", "?????");
// app.use(express.static(path.join(__dirname, '')));
app.use('/api', mainRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  //   res.locals.message = err.message;
  console.error(err);
  res.status(err.status || 500).json({ message: err });
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
