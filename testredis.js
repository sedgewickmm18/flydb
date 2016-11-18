
require('./proxy.js');

require('./index.js').then(function(_flydb) {    // index.js, resp. flydb returns a promise

  flydb = _flydb;
  //console.log(flydb);
 
  //flydb.test = "hello-world";
  //flydb.test2 = "hello-world2";

  if (isNaN(flydb.test)) {flydb.test = 1;}


  setInterval(function() {
    console.log('-------------------------------');
    console.log(flydb.test);
    flydb.test = flydb.test + 1;
  }, 3000);

});

