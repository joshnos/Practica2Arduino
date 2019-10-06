const express = require('express');

const app = express();

var bodyParser = require('body-parser');
var data = require('./public/data.json');

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.json());

app.get('/buzzer', function(req, res) {
  res.json();
});

app.get('/sensor', function(req, res) {
  res.json(data[2]);
});

app.put('/sensor', function(req, res) {
  data[2] = req.body;
  res.redirect('/data');
});

app.get('/led', function(req, res) {
  res.json();
});

app.get('/data', function(req, res) {
  res.json(data);
});

app.get('/',function(request, response){
    response.send(__dirname + '/index.html');
});

app.listen('3000', function() {
  console.log('Servidor web escuchando en el puerto 3000');
});