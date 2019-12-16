var mqtt = require('mqtt');
var client = mqtt.connect("mqtt://192.168.0.13", {clientId:"clientWebApp"});

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
	    console.log("message is "+ message);
	    console.log("topic is "+ topic);
    });
}

exports.publish = function(topic, message) {
    client.publish(topic, message);
}

exports.end = function() {
    client.end();
}