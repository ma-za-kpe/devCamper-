var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const pe = require('parse-error');

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bootcampsRouter = require('./routes/bootcamps');

var app = express();

// db
require("./config/db");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/bootcamps', bootcampsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// CORS
app.use(cors());

// error handler
app.use(function (err, req, res, next) {
  console.log(err.stack.red)

  //get custome errors
  let error = {
    ...err
  }
  error.message = err.message

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //mongoose bad objectid
  if (err.name === 'CastError') {
    const message = `Bootcamp not found with id of ${err.value}`
    error = message || 404
  }

  // render the error page
  res.status(error.status || 500);
  res.status(500).json({
    success: false,
    error: error.message
  })
  // res.render('error');
});

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', pe(error));
});

module.exports = app;