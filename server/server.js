/*
* Express server running at http://localhost:3000
* TODO: add routing
* */

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')('server');
var port = env.process.env.PORT || 3000;


server.listen(port, function() {
  console.log('Smart Shopping listening at http://localhost:', port);
});