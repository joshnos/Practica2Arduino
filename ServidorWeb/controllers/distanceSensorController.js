const Sensor = require('../models/distanceSensor');

sensor = new Sensor(2, 50, 0);

exports.getSensor = function(req, res) {
    res.json({
        id: sensor.id,
        status: sensor.status,
        minDistance: sensor.minDistance
    });
}

exports.setStatus = function(req, res) {
    if(sensor.status === 0) {
        sensor.changeStatus(1);
        res.send('encendido');
    }else {
        sensor.changeStatus(0);
        res.send('apagado');
    }
}

exports.setMinDistance = function(req, res) {
    sensor.changeMinDistance(req.body.distance);
    res.send('exito');
}