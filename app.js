var express = require('express');
// Root path
global.APP_ROOT_PATH = __dirname + '/';

// Set other app paths
require('./config/global-paths');
// Set config variables
global.config = require('./config/index');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

// Load mongoose package
var mongoose = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Connect to MongoDB and create/use database called todoAppTest
mongoose.Promise = global.Promise;
mongoose.connect(config.db.MONGO_CONNECT_URL,{
    useMongoClient: true
});

//setup routes
const routes = require(APP_ROUTE_PATH);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.server.PORT, function () {
    console.log('App is running on ' +config.server.PORT);
});
