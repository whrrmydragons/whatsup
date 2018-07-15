let express = require('express');
let router = express.Router();

const tcpp = require('tcp-ping');
const ping = require('ping');

/* GET users listing. */
router.get('/', function(req, res, next) {
  tcpp.probe('bing.com', 80, function(err, available) {
    res.io.emit("socketToMe", available);
});

tcpp.ping({ address: 'bing.com',port:443}, function(err, data) {
    res.io.emit("socketToMe", data);
});

const hosts = ['192.168.1.1', 'google.com', 'yahoo.com'];

hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        let msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        res.io.emit("socketToMe", msg);
    });
});


  res.send('respond with a resource.');
});

module.exports = router;
