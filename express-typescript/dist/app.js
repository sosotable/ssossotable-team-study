"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const createError = require('http-errors');
// @ts-ignore
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const mainRouter = require('./routes/main');
const contentRouter = require('./routes/content');
const app = express();
// view engine setup
app.set('views', path.join(process.env.BUILD_PATH, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.env.BUILD_PATH, 'public')));
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/main', mainRouter);
app.use('/content', contentRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('components/error');
});
module.exports = app;
