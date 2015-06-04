/*
* Express server running at http://localhost:3000
* TODO: add routing
* */

var express = require('express');
var listController = require('./lists/listController.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var firebaseAuth = require('./middleware/authFirebase');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/smart-shopping');

listController.createUser();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function (req, res, next) {
  var ts = new Date();
  console.log(req.url + ' - ' + req.method);
  console.log('Time:', ts);
  next();
});


app.use(session({
  secret: 'savage tadpole',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static(__dirname + '/../public'));

app.use('/api/item/add', itemController.createNewItem);
app.post('/api/item/add', listController.addItemToList); 

app.delete('/api/item/delete', listController.deleteItemFromList);
app.post('/api/item/archive', listController.addItemToArchive);


app.post('/api/register', function(request, response, next){
  var email = request.body.email;
  var password = request.body.password;
  firebaseAuth.createUser(email, password, request, response, next);
  console.log('email - pass' + request.body.email + ' - ' + request.body.password);

});

app.post('/api/signIn', function(request, response, next){
  var email = request.body.email;
  var password = request.body.password;
  firebaseAuth.signIn(email, password, request, response, next);
  console.log('email - pass' + request.body.email + ' - ' + request.body.password);
});

app.get('/protected', firebaseAuth.validateUserToken.bind(firebaseAuth) , function(request, response, next){
  response.redirect('/testIndex.html');
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Smart Shopping listening at http://localhost:%s', port);
});



