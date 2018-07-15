let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

const tcpp = require('tcp-ping');
const ping = require('ping');


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

const sample = {
};

const hosts = [];
let addHost = (host,port)=>{
  hosts.push({host,port})
  sample[host] = {msg:"",ping:"",probe:""}
}
addHost('192.168.1.1',80);
addHost('google.com',80);
addHost('bing.com',80);
addHost('youtube.com',443);
addHost('facebook.com',80);

let update = ()=>{
hosts.forEach(function(host){
  let hostname = host.host;

  let curr = sample[hostname];
  
    ping.sys.probe(hostname, function(isAlive){
        let msg = isAlive ? 'host ' + hostname + ' is alive' : 'host ' + hostname + ' is dead';
        sample[hostname].msg = msg;
    });
    tcpp.probe(host.host, host.port, function(err, available) {
      sample[hostname].probe = available;
  });
  
  tcpp.ping({ address: host.host,port:host.port}, function(err, data) {
      sample[hostname].ping = data ;
  });
    
});
io.emit("update", sample);


}

setInterval(update,5000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function(req, res, next){
  res.io = io;
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = {app,server};
