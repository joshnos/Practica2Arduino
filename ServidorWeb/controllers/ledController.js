const Led = require('../models/led');

led = new Led(0, 0);

exports.getLed = function(req, res) {
    res.json({
        id: led.id,
        status: led.status
    });
}

exports.setStatus = function(req, res) {
    if(led.status === 0) {
        led.changeStatus(1);
        res.send('encendido');
    }else {
        led.changeStatus(0);
        res.send('apagado');
    }
}
