const initializeSocketServer = (io)=>{
const tcpp = require('tcp-ping');
const ping = require('ping');
const _ = require('lodash/core');
const sample = {
};

const hosts = [];
let addHost = (host,port)=>{
  hosts.push({host,port})
  sample[host] = {
      msg:"",
      ping:"",
      probe:"",
      isAliveTest:{fail:0,success:0},
      probeTest:{fail:0,success:0},
      pingTest:{fail:0,success:0,avgTime:0}

      }
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
            curr.msg = msg;
            if(isAlive)curr.isAliveTest.success+=1
            else curr.isAliveTest.fail+=1
        });
        tcpp.probe(host.host, host.port, function(err, available) {
            curr.probe = available;
            if(available)curr.probeTest.success+=1
            else curr.probeTest.fail+=1
      });
      
      tcpp.ping({ address: host.host,port:host.port}, function(err, data) {
        curr.ping = data;
        let currSum = 0;
        let currSuccessCount = 0;
        _.map(data.results,result=>{
            if(result.err)curr.pingTest.fail+=1;
            else {
                curr.pingTest.success+=1;
                currSuccessCount++;
                currSum += result.time;
            }
        });
        if(curr.pingTest.avgTime === 0&&currSuccessCount!==0) //when initializing avarege it equals the avarage
            curr.pingTest.avgTime=currSum/currSuccessCount;
        else if(curr.pingTest.avgTime !== 0&&currSuccessCount!==0) // after initialization the avarage is computed using previous avarage and current one
            curr.pingTest.avgTime=(curr.pingTest.avgTime+currSum/currSuccessCount)/2;
      });
        
    });
    io.emit("update", sample);
    
    
    }
    
    setInterval(update,5000);
}


module.exports = {initializeSocketServer};