#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <stdio.h>

#define HTTP_REST_PORT 80
#define WIFI_RETRY_DELAY 500
#define MAX_WIFI_INIT_RETRY 50

struct Led {
    int id;
    int gpio;
    int status;
};
Led led_resource;

struct Buzzer {
  int id;
  int gpio;
  int status;
  int frecuency;
}; 
Buzzer buzzer_resource;

struct Sensor {
  int id;
  int trigGpio;
  int echoGpio;
  int distance;
  int limit;
  int status;
};
Sensor sensor_resource;

const char* wifi_ssid = "AndroidAP70C0";
const char* wifi_passwd = "ukpr7689";

ESP8266WebServer http_rest_server(HTTP_REST_PORT);

void init_led_resource() {
    led_resource.id = 0;
    led_resource.gpio = 16;
    led_resource.status = 0;
}

void init_buzzer_resource() {
  buzzer_resource.id = 1;
  buzzer_resource.gpio = 4;
  buzzer_resource.status = 0;
  buzzer_resource.frecuency = 440;
}

void init_sensor_resource() {
  sensor_resource.id = 2;
  sensor_resource.trigGpio = 0;
  sensor_resource.echoGpio = 2;
  sensor_resource.distance = 500;
  sensor_resource.limit = 30;
  sensor_resource.status = 0;
}


int init_wifi() {
    int retries = 0;

    Serial.println("Connecting to WiFi AP..........");

    WiFi.mode(WIFI_STA);
    WiFi.begin(wifi_ssid, wifi_passwd);
    // check the status of WiFi connection to be WL_CONNECTED
    while ((WiFi.status() != WL_CONNECTED) && (retries < MAX_WIFI_INIT_RETRY)) {
        retries++;
        delay(WIFI_RETRY_DELAY);
        Serial.print("#");
    }
    return WiFi.status(); // return the WiFi connection status
}

void set_sensor_status(JsonObject& jsonBody) { 
    led_resource.status = jsonBody["status"];
}

void set_buffer_frecuency(JsonObject& jsonBody) { 
    buzzer_resource.frecuency = jsonBody["frecuency"];
}

void set_sensor_limit(JsonObject& jsonBody) { 
    sensor_resource.limit = jsonBody["limit"];
}

void put_alarm() {
    StaticJsonBuffer<500> jsonBuffer;
    String post_body = http_rest_server.arg("plain");
    Serial.println(post_body);

    JsonObject& jsonBody = jsonBuffer.parseObject(http_rest_server.arg("plain"));
    
    if (!jsonBody.success()) {
        Serial.println("error in parsin json body");
        http_rest_server.send(400);
    }
    else {   
        if (http_rest_server.method() == HTTP_PUT) {
            sensor_resource.status = jsonBody["status"];
            http_rest_server.send(200);
        } else {
            http_rest_server.send(404);
        }
    }
}

void put_frecuency() {
    StaticJsonBuffer<500> jsonBuffer;
    String post_body = http_rest_server.arg("plain");
    Serial.println(post_body);

    JsonObject& jsonBody = jsonBuffer.parseObject(http_rest_server.arg("plain"));
    
    if (!jsonBody.success()) {
        Serial.println("error in parsin json body");
        http_rest_server.send(400);
    }
    else {   
        if (http_rest_server.method() == HTTP_PUT) {
            buzzer_resource.frecuency = jsonBody["frecuency"];
            http_rest_server.send(200);
        } else {
            http_rest_server.send(404);
        }
    }
}

void put_limit() {
    StaticJsonBuffer<500> jsonBuffer;
    String post_body = http_rest_server.arg("plain");
    Serial.println(post_body);

    JsonObject& jsonBody = jsonBuffer.parseObject(http_rest_server.arg("plain"));
    
    if (!jsonBody.success()) {
        Serial.println("error in parsin json body");
        http_rest_server.send(400);
    }
    else {   
        if (http_rest_server.method() == HTTP_PUT) {
            sensor_resource.limit = jsonBody["limit"];
            http_rest_server.send(200);
        } else {
            http_rest_server.send(404);
        }
    }
}

void config_rest_server_routing() {
    http_rest_server.on("/", HTTP_GET, []() {
        http_rest_server.send(200, "text/html",
            "Welcome to the ESP8266 REST Web Server");
    });
    http_rest_server.on("/alarm/on", HTTP_PUT, put_alarm);
    http_rest_server.on("/alarm/off", HTTP_PUT, put_alarm);
    http_rest_server.on("/buzzer/frecuency", HTTP_PUT, put_frecuency);
    http_rest_server.on("/sensor/limit", HTTP_PUT, put_limit);
}

void setup() {
   Serial.begin(115200);

   pinMode(0, OUTPUT);
   pinMode(2, INPUT); 
    init_led_resource();
    init_buzzer_resource();
    init_sensor_resource();
    if (init_wifi() == WL_CONNECTED) {
        Serial.print("Connetted to ");
        Serial.print(wifi_ssid);
        Serial.print("--- IP: ");
        Serial.println(WiFi.localIP());
    }
    else {
        Serial.print("Error connecting to: ");
        Serial.println(wifi_ssid);
    }
    config_rest_server_routing();

    http_rest_server.begin();
    Serial.println("HTTP REST Server Started");
}

void loop() {
  long duration, distance;
  digitalWrite( 0, LOW);        
  delayMicroseconds(2);              
  digitalWrite( 0, HIGH);       
  delayMicroseconds(10);             
  digitalWrite( 0, LOW);        
  duration = pulseIn( 2, HIGH) ;
  distance = duration / 2 / 29.1  ;           
  if (sensor_resource.status == 1){
    if (distance < sensor_resource.limit) {
      tone( 4, buzzer_resource.frecuency);
      digitalWrite ( 16, HIGH) ;
    }else {
      noTone(4);
      digitalWrite( 16, LOW) ;
    }
  } else {
    noTone(4);
    digitalWrite( 16, LOW) ;
  }
  Serial.println(duration);
  Serial.println(distance);
  http_rest_server.handleClient();
}
