//pinger.js
//var rpc = require('msgpack-rpc');
var rpc = require('./node_modules/node-msgpack-rpc/lib/msgpack-rpc.js')
var ponger = rpc.createClient(6102,'localhost');
var handler = {
  'pong' : function(pid){
    console.log('pinger was ponged by PID '+pid);
  }
};
var tick = function(){
  ponger.invoke('ping');
  setTimeout(tick, 1000);
}

rpc.createServer();
rpc.setHandler(handler);
rpc.listen(6101);
tick();
    
