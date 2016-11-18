require('./proxy.js');

flydb = require('./index.js');

flydb.test = "hello world";
flydb.test2 = "hello world2";

console.log('-------------------------------');
console.log(flydb.test);
console.log(flydb.test2);
