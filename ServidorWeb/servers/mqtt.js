var mqtt = require('mqtt');
var client = mqtt.connect("mqtt://192.168.0.13", {clientId:"clientWebApp"});
var email = require('./email');

exports.conect = function() {
    client.on("connect",function(){	
        console.log("connected " + client.connected);
    });

    client.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)
    });
}

exports.error = function() {
    client.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)
    });
}

exports.suscribe = function(topic) {
    client.subscribe(topic,{qos:1});
}

exports.callback = function() {
    client.on('message',function(topic, message, packet){
        console.log(topic + " " + message);
        let msg = {
            subject: message,
            text: ""
        };
	    if (topic.includes("alarmOut")) {
            msg.text = "El sensor detecto movimiento, ve a la pagina de la aplicacion para apagar la alarma";
        }
        if (topic.includes("sensorOut")) {
            if(message.includes("encendido"))
                msg.text = "El sensor se encendio a la hora previamente programada";
            if(message.includes("apagado"))
                msg.text = "El sensor se apago a la hora previamente programada";
        }
        email.sendEmail(msg);
    });
}

exports.publish = function(topic, message) {
    client.publish(topic, message);
}

exports.end = function() {
    client.end();
}