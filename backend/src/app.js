const express = require('express');
const helmet = require('helmet');
const Sentry = require('@sentry/node');
require('dotenv/config');
require('express-async-errors');

const AppError = require('./utils/appError');
const routes = require('./routes');

const app = express();

Sentry.init({
  dsn: process.env.NODE_ENV === 'production' ? process.env.SENTRY_DSN : null,
});
app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' www.google-analytics.com; frame-src 'self'; font-src 'self' fonts.gstatic.com cdnjs.cloudflare.com; img-src 'self' www.googletagmanager.com www.google-analytics.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com cdnjs.cloudflare.com; script-src 'self' 'unsafe-eval' 'nonce-G-SQ2MFD61V6' data: www.googletagmanager.com www.google-analytics.com;",
  );
  next();
});
app.use(routes);
app.use((err, request, response, _next) => {
  if (err instanceof AppError) {
    return response.json({
      err: 'error',
      msg: err.message
    });
  }
  
  console.log(err);
  Sentry.captureException(err);
  return response.json({
    err: 'error', 
    msg: '500 Internal Server Error'
  });
});

module.exports = { app };
