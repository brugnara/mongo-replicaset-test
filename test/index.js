var mongo = require('mongodb').MongoClient;
var debug = require('debug')('test:replica');
var co = require('co');

var mongourl = process.env.MONGO_URL;

co(function*(){

  debug('init all');
  var db = yield mongo.connect(mongourl, {
    server: {
      auto_reconnect: true,
      poolSize: 5
    },
    replSet: {
      retries: 1000000
    }
  });

  db.on('reconnect', function() {
    debug('event, db reconnected');
  });

  db.on('error', function(err) {
    debug('error 1: %s', err.message);
  });

  var coll = db.collection('replica_test');  

  debug('db connected');

  setInterval(co.wrap(function*() {
    debug('tick');
    try {   
      yield coll.insertOne({val: Math.random()});

      var val = yield coll.count({});
      debug(val);
    } catch(e) {
      debug('error: %s', e.message);
    }

  }), 2000);

}).catch(function(err) {
  console.log(err);
  condole.log(err.stack);
  process.exit(1);
});
