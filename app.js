var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');

var index = require('./routes/home/index');
var mood= require('./routes/home/mood');
var list = require('./routes/home/list');
var detail = require('./routes/home/detail');
var notes= require('./routes/home/notes');
var blogs= require('./routes/home/blogs');

var admin= require('./routes/admin/index');
var adminposts = require('./routes/admin/posts');
var homeposts = require('./routes/home/posts');
var cats= require('./routes/admin/cats');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '12345',
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
 }));

app.use('/', index);
app.use('/detail', detail);
app.use('/list', list);
app.use('/notes', notes);
app.use('/posts', homeposts);
app.use('/admin', admin);
app.use('/blogs', blogs);
app.use('/mood', mood);
app.use('/admin/posts', adminposts);
app.use('/admin/cats', cats);
// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});

// error handler
//app.use(function(err, req, res, next) {
//  // set locals, only providing error in development
//  res.locals.message = err.message;
//  res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//  // render the error page
//  //res.status(err.status || 500);
//  res.render('error');
//});
app.listen(3000);
module.exports = app;
