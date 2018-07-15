const initializeSocketServer = (io)=>{
const tcpp = require('tcp-ping');
const ping = require('ping');

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
}


module.exports = {initializeSocketServer};