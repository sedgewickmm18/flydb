# flydb for node.js
the fastest slowest database there is. 
+ fastest in terms of easiest to use, there is literally no new API
+ slowest in terms of performance, this db is extremely slow. With redis serving as backend this is less a concern, however.
So why flydb?

## Why I made this
I made flydb because I wanted to be able to persist data for some of my projects. In order to do that I need to set up a database.  This was a pain and I always dreaded doing it. So I created flydb, the easiest way to save your data but this is not for everyone...

## Who is this for?
Flydb is for anyone who wants to create a simple project and needs to persist data but don't want to set up a database.
You **should** use flydb because
+ flydb is super easy to use
+ flydb is super easy to migrate
+ setup takes 5seconds

You **shouldn't** use flydb because
+ flydb is not scalable at all
+ flydb is extremely slow (but really for minor projects, you won't notice a difference)

With the turn to redis it allows for checkpointing and hence seamless restart and recovery of short-running processes. It can well be combined with a scheduler to process events. However, it requires you to set up redis, so setup will take a bit more than 5 seconds now.

## !IMPORTANT
In order to run this you will need to activate --harmony-proxies, luckily you dont need to install anything on top of node.

````
node --harmony-proxies <your commands>
````

<b>Note</b>: With node 6 LTS supporting a bigger part of ECMA-262 this is no longer required.

##Install

````
  npm install flydb
````

##Example

````javascript
var flydb = require('flydb');

flydb.test = "hello world";  //flydb.test will now persist
````

Change the codes and see if it's still there! you will be amazed!!
````javascript
var flydb = require('flydb');

console.log(flydb.test);
````

## TODO:
+ Add testing
+ Add some more functionality without disrupting it's simplicity, such as allow users to create their own .fdb files on init
+ Externalize the interface to redis: currently it is using redis on localhost which - to some degree - contradicts its intended usage as checkpointing tool.


