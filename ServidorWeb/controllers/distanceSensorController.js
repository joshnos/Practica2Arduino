const Sensor = require('../models/distanceSensor');
const Requests = require('../requests');

requests = new Requests();
sensor = new Sensor(2, 0, 50, 0);

exports.getSensor = function(req, res) {
    res.json({
        id: sensor.id,
        status: sensor.status,
        limit: snsor.limit,
        distance: sensor.distance
    });
}

exports.setStatus = function(req, res) {
    if(sensor.status === 0) {
        sensor.changeStatus(1);
        requests.put({
            "status": 1
        }, "/alarm/on");
        res.send('encendido');
    }else {
        sensor.changeStatus(0);
        requests.put({
            "status": 0
        }, "/alarm/off");
        res.send('apagado');
    }
}

exports.setdistance = function(req, res) {
    sensor.changedistance(req.body.distance);
    res.send('exito');
}

exports.setLimit = function(req, res) {
    sensor.changeLimit(req.body.limit);
    requests.put(req.body, "/sensor/limit");
    res.send('exito');
}