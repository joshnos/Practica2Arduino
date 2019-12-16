const express = require('express');
const app = express();
var cors = require('cors');
const mqtt = require('./serverMqtt');

app.use(cors())
var bodyParser = require('body-parser');

var buzzerRoutes = require('./routes/buzzerRoutes');
var ledRoutes = require('./routes/ledRoutes');
var sensorRoutes = require('./routes/distanceSensorRoutes');

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.json());

app.use('/buzzer', buzzerRoutes);
app.use('/led', ledRoutes);
app.use('/sensor', sensorRoutes);

mqtt.conect();
mqtt.suscribe("alarmOut");
mqtt.suscribe("sensorOut");
mqtt.callback();

app.get('/',function(req, res){
  res.send(__dirname + '/index.html');
});

app.listen('3000', function() {
  console.log('Servidor web escuchando en el puerto 3000');
});