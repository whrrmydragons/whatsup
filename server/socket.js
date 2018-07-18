const initializeSocketServer = (io)=>{
const tcpp = require('tcp-ping');
const ping = require('ping');
const _ = require('lodash/core');
const MAX_ITER = 100;
let sample = {data:{},iter:0};
const timeout = 75;
const attempts = 1;
const hosts = [];
let addHost = (host,port)=>{
  hosts.push({host,port})
  sample.data[host] = {
      ping:"",
      pingTest:{fail:0,success:0,avgTime:0},
      votes:{count:0,voters:[]}
      }
}
addHost('192.168.1.1',80);
addHost('google.com',80);
addHost('bing.com',80);
addHost('youtube.com',443);
addHost('facebook.com',80);



/**
 *defines how to update the sampling at each updateInterval and emits the new sample changes to the client
 *
 */
function update(){
    sample.iter++;
    hosts.forEach(function(host){
      let hostname = host.host;
    
      let curr = sample.data[hostname];
      
      
      tcpp.ping({ address: host.host,port:host.port,timeout,attempts}, function(err, data) {
        curr.ping = data;
        let currSum = 0;
        let currSuccessCount = 0;
        _.map(data.results,result=>{
            if(result.err)curr.pingTest.fail+=1;
            else {
                currSuccessCount++;
                currSum += result.time;
            }
        });
        if(curr.pingTest.avgTime === 0&&currSuccessCount!==0) //when initializing avarege it equals the avarage
            curr.pingTest.avgTime=currSum/currSuccessCount;
        else if(curr.pingTest.avgTime !== 0&&currSuccessCount!==0) // after initialization the avarage is computed using previous avarage and current one
            curr.pingTest.avgTime=(curr.pingTest.avgTime+currSum/currSuccessCount)/2;
            curr.pingTest.success+=(data.avg?1:0);

      });
        
    });
    io.emit("update", sample);
    if(sample.iter >= MAX_ITER){
        reset()
        sample.iter = 0;
    }
    setTimeout(update,timeout*attempts*hosts.length);
    }
    update();

    //TODO: finish iplementing voting system
io.on('connection',socket=>{
    //console.log(socket.handshake.headers.host)
socket.on('vote',(vote)=>{
    console.log(vote)
    console.log(socket.id)
})
});


    /**
     *
     *Defines how to reset the current samples from update occures every resetInterval
     */
    function reset(){
        sample = {data:{},iter:0};
        addHost('192.168.1.1',80);
        addHost('google.com',80);
        addHost('bing.com',80);
        addHost('youtube.com',443);
        addHost('facebook.com',80);
        
    }

    // let updateInterval= ()=> 5000;
    // let resetInterval = ()=>(updateInterval()*10)+1;
    // setInterval(update,updateInterval());

}

//TODO: currently takes a single test think o a way to generelize
/**
 *
 *
 * @param {*} tests An Array of tests each contains fail\success(integers)
 * @returns green orange or red "string" based on the fail success ratio
 */
function status(test){
    let {fail,success} = test;
    const greenThreshold = 0.8;
    const orangeThreshold = 0.5;
    let ratio = fail>0?success/fail:1;
    return ratio>=greenThreshold?"green":(ratio>=orangeThreshold?"orange":"red");
}

module.exports = {initializeSocketServer};