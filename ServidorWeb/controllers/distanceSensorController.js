const Sensor = require('../models/distanceSensor');
const mqtt = require('../servers/mqtt');

sensor = new Sensor(2, 0, 50, 0, "");

exports.getSensor = function(req, res) {
    res.json({
        id: sensor.id,
        status: sensor.status,
        limit: sensor.limit,
        distance: sensor.distance,
        detect: sensor.detect
    });
}

exports.setStatus = function(req, res) {
    sensor.changeStatus(req.body.status);
    mqtt.publish("sensorIn", req.body.status.toString());
    res.send({ exito: 'ok' });
}

exports.setdistance = function(req, res) {
    sensor.changedistance(req.body.distance);
    res.send({ exito: 'ok' });
}

exports.setLimit = function(req, res) {
    sensor.changeLimit(req.body.limit);
    res.send({ exito: 'ok' });
}

exports.setDetect = function(req, res) {
    sensor.changeDetect(req);
}

exports.setAlamrTime = function(req, res) {
    mqtt.publish("setAlarm", Buffer.from(JSON.stringify(req.body)));
    res.send({ exito: 'ok' });
}