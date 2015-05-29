/*
* Express server running at http://localhost:3000
* TODO: add routing
* */

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var firebaseRequestHandler = require('./middleware/authFirebase');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));

//static files will be served from the public directory
app.use(function (req, res, next) {
  var ts = new Date();
  console.log(req.url + ' - ' + req.method);
  console.log('Time:', ts);
  next();
});

server.listen(app.get('port'), function() {
  console.log('Express server with socket.io intiated')
})
