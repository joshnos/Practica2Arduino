const Sensor = require('../models/distanceSensor');
const Requests = require('../requests');

requests = new Requests();
sensor = new Sensor(2, 0, 50, 0);

exports.getSensor = function(req, res) {
    res.json({
        id: sensor.id,
        status: sensor.status,
        limit: sensor.limit,
        distance: sensor.distance
    });
}

exports.setStatus = function(req, res) {
    sensor.changeStatus(req.body.status);
    requests.put(req.body.status, "/alarm/on");
    res.send('exito');
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