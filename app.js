var express = require('express');

var app = module.exports = express.createServer();

var storage = 
{
  tokens:{tkfoo:'admin', tkbar:'view'},
  fans: {
    tkfoo:
      { name:'agora',
        blades:
        [{btcaddr:'1Nfoo', shares:1, nick:'alice'},
         {btcaddr:'1qfoo', shares:1, nick:'bob'} ],
      },
    tkbar:
      { name:'jimbob',
        blades:
        [{btcaddr:'1ybar', shares:18, nick:'charlie'},
         {btcaddr:'1zbar', shares:1000, nick:'obama'} ],
      },
  },
};
// Configuration

app.configure(function(){
  app.set('views', __dirname);
  app.set('view engine', 'jade');
  app.set('view options', {layout:false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
// Routes

app.get('/', function(req,res){
  res.render('index.jade');
});

app.get('/:id', function(req, res){
  var _id=req.params.id;
  var tmp = storage.tokens[_id];  // either undefined, 'admin', 'view'

  console.log('Token '+_id+' is:\n'+JSON.stringify(tmp,null,2));
  if(tmp == undefined){
    res.send(404);
  } else if (tmp == 'admin'){
    var fan = storage.fans[_id];
    res.render('admin.jade', {title:fan.name, blades:fan.blades});
  } else if (tmp == 'view'){
    var fan = storage.fans[_id];
    res.render('view.jade', {title:fan.name, blades:fan.blades});
  } else {
    res.send('!',500);
  };
});
  


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
