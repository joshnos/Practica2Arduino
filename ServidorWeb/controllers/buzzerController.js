const Buzzer = require('../models/buzzer');
const Requests = require('../requests');

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
    if(buzzer.status === 0) {
        buzzer.changeStatus(1);
        res.send('encendido');
    }else {
        buzzer.changeStatus(0);
        res.send('apagado');
    }
}

exports.setFrecuency = function(req, res) {
    buzzer.changeFrecuency(req.body.frecuency);
    requests.put(req.body, "/buzzer/frecuency");
    res.send('exito');
}