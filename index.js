var fs = require('fs');
var http = require('http');
var Redis = require('ioredis');
var redis = new Redis();

const DIRECTORY = './flydata/data.fdb';

var flydb = {
	start: startredis,
	//start: startfile,
	_data: {}
}
flydb._data.name = 'FlyDB';

flydb.data = require('./proxy')(flydb._data, function(payload){
	//_savetofile(payload);
	_redisstore(payload);
});


if (typeof Proxy === 'undefined') {
   _requestProxy();
}

var keywords = Object.keys(flydb);


/*
 * Starts reading the flat file synchronously since boot performance is not important
 */
function startfile(){
   try{
      var data = fs.readFileSync(DIRECTORY).toString();
   } catch (err) {
      var data = {};
      fs.mkdirSync('./flydata/');
      fs.writeFileSync(DIRECTORY, "{}")
   }

   flydb._data.data = JSON.parse(data);
   return flydb.data;
}

/*
 * Getting stuff out of redis - return a promise
 */
function startredis(){
   var p = new Promise(function (resolve, reject) {
      redis.get('flydb', function(err, result) {
         flydb._data.data = (result) ? JSON.parse(result) : {};
         resolve(flydb.data);
      });
   });
   return p;
}

/*
 * tries to turn string into object
 *
 * @param {string} data
 */
function _parseString(data){
	try{
		data = JSON.parse(data);
	} catch (err) {}
	return data;
}

/*
 * Creates a shallow copy of an object, required for Proxy
 */
function shallowCopy(src, dst) {
  if (src instanceof Array) {
    dst = dst || [];

    for (var i = 0, ii = src.length; i < ii; i++) {
      dst[i] = src[i];
    }
  } else if (typeof src === 'object') {
    dst = dst || {};

    for (var key in src) {
      if (!(key.charAt(0) === '$' && key.charAt(1) === '$')) {
        dst[key] = src[key];
      }
    }
  }

  return dst || src;
}

/*
 * Stringifies object
 */
function _stringify(data){
	var data = shallowCopy(data);
	try{
		data = JSON.stringify(data);
	} catch (err) {}
	return data;
}

/*
 * Checks if harmony proxies have been enabled
 */
function _requestProxy(){
	throw("Please use 'node --harmony-proxies <your commands>'");
}

/*
 * Saves data in db;
 */
function _savetofile(payload){
	fs.writeFileSync(DIRECTORY, payload);
}

/*
 * Stores data in redis
 */
function _redisstore(payload){
        redis.set('flydb', payload);
}


module.exports = flydb.start();


