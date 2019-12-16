const Buzzer = require('../models/buzzer');
const Requests = require('../servers/requests');

requests = new Requests();
buzzer = new Buzzer(1, 0, 440);

exports.getBuzzer = function(req, res) {
    res.json({
        id: buzzer.id,
        status: buzzer.status,
        frecuency: buzzer.frecuency
    });
}

exports.setStatus = function(req, res) {
    buzzer.changeStatus(req.body.status);
    res.send('exito');
}

exports.setFrecuency = function(req, res) {
    buzzer.changeFrecuency(req.body.frecuency);
    requests.put(req.body, "/buzzer/frecuency");
    res.send('exito');
}