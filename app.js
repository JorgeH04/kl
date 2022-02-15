'use strict';

require('dotenv-safe').config({
  allowEmptyValues: true
});
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }          
require('serve-favicon');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const appointments = require('./routes/appointments');
const scheduler = require('./scheduler');

const app = express();
      
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');

app.use('/appointments', appointments);
app.use('/', appointments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

scheduler.start();

 
module.exports = app;

// TWILIO_ACCOUNT_SID=AC3159436f8bb88f83f66a22fac8f71003
// TWILIO_AUTH_TOKEN=f425369b56c1665cca2efad0d9d128a2
// TWILIO_PHONE_NUMBER=+18456689535
// MONGODB_URI=mongodb://127.0.0.1:27017/appointment-reminders
// MONGO_URL_TEST=mongodb://127.0.0.1:27017/appointment-reminders
// NODE_ENV=production
