#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "LABO16";
const char* password = "catolica16";
const char* clientId = "ESP8266Client";
IPAddress mqtt_server(192, 168, 2, 83);

int pir = 5;
int led = 2;
int buzzer = 14;
int frecuencia = 440;

int isOn = 0;

long lastMsg = 0;
char msg[50];
int value = 0;

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {

  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(String topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  if(topic == "alarm") {
    if ((char)payload[0] == '1') {
      isOn = 1;
     }
     if ((char)payload[0] == '0') {
      isOn = 0;
     }
  }
  
  if(topic == "frecuency") {
    Serial.println();
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect(clientId)) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("alarm");
      client.subscribe("frecuency");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void alarmOn() {
  digitalWrite (BUILTIN_LED, LOW);
  digitalWrite (buzzer, LOW);
}

void alarmOff() {
  digitalWrite (BUILTIN_LED, HIGH);
  digitalWrite (buzzer, HIGH);
}

void alarma() {
  int state = digitalRead(pir);
  delay(500);                         //Check state of PIR after every half second
  
  if(state == HIGH){                
    alarmOn();
    snprintf (msg, 75, "Hay movimiento", value);
    client.publish("alarm", msg);
  } else {
    alarmOff();
  }
}

void setup() {
  
  Serial.begin(115200);
  pinMode(BUILTIN_LED, OUTPUT);   
  pinMode(pir,INPUT);
  pinMode(buzzer,OUTPUT);
  alarmOff();
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  if(isOn == 1) {
    alarma();
  } else {
    alarmOff();
  }
  
  /*long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
    ++value;
    snprintf (msg, 75, "hello world #%ld", value);
    Serial.print("Publish message: ");
    Serial.println(msg);
    client.publish("outTopic", msg);
  }*/
}