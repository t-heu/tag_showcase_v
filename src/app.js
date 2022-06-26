const express = require('express');
const nunjucks = require('nunjucks')
const path = require('path');
const helmet = require('helmet');
const flash = require('connect-flash');
const session = require('express-session');
const Sentry = require('@sentry/node');
require('dotenv/config');
require('express-async-errors');

const AppError = require('./utils/appError');
const routes = require('./routes');

const app = express();

Sentry.init({
  dsn: process.env.NODE_ENV === 'production' ? process.env.SENTRY_DSN : null,
});
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(
  session({
    cookie: { maxAge: 60000 },
    name: 'sid',
    secret: 'woot',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  next();
});
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' www.google-analytics.com; frame-src 'self'; font-src 'self' fonts.gstatic.com cdnjs.cloudflare.com; img-src 'self' www.googletagmanager.com www.google-analytics.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com cdnjs.cloudflare.com; script-src 'self' 'unsafe-eval' 'nonce-G-SQ2MFD61V6' data: www.googletagmanager.com www.google-analytics.com;",
  );
  next();
});
app.use(helmet());
app.use(routes);
app.use((err, request, response, _next) => {
  if (err instanceof AppError) {
    response.set('error', err.message);
    request.flash('error', err.message);
    return response.redirect('/');
  }

  console.log(err);
  Sentry.captureException(err);
  request.flash('error', '500 Internal Server Error');
  return response.redirect('/');
});

module.exports = { app };
