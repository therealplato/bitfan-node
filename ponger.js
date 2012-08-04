//ponger.js
var rpc = require('msgpack-rpc');

var pinger = rpc.createClient(6101,'localhost');

var handler = {
  'ping' : function(){
    console.log('ponger was pinged');
    pinger.invoke('pong', '101', function(){return});
  },
};

rpc.createServer();
rpc.setHandler(handler);
rpc.listen(6102);
