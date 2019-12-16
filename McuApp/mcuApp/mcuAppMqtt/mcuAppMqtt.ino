#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <RtcDS3231.h>
#include <Wire.h>
RtcDS3231<TwoWire> Rtc(Wire);

//topicos usados:
//SUSCRIBE: sensorIn, setAlarm
//PUBLISH: outTopic, alarmOut, sensorOut

const char* ssid = "NOSTAS";
const char* password = "JOS#200197SAM-060604";
const char* clientId = "ESP8266ClientMcu";
IPAddress mqtt_server(192, 168, 0, 11);

int pir = 5;
int led = 2;
int buzzer = 14;

bool sensorIsOn = false;

bool alarmTimeIsSet = false;

int hhOn = 0;
int mmOn = 0;

int hhOff = 0;
int mmOff = 0;

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

void setUp_rtc() {
  Rtc.Begin();
  RtcDateTime compiled = RtcDateTime(__DATE__, __TIME__);
  if (!Rtc.IsDateTimeValid()) 
  {
    Serial.println("RTC lost confidence in the DateTime!");
    Rtc.SetDateTime(compiled);
  }
  RtcDateTime now = Rtc.GetDateTime();
  
  Rtc.Enable32kHzPin(false);
  Rtc.SetSquareWavePin(DS3231SquareWavePin_ModeNone);
  printNowTime(now);
}

void printNowTime(RtcDateTime now) {
  Serial.print("Date:");
  Serial.println(now.Year(), DEC);
  Serial.print('/');
  Serial.print(now.Month(), DEC);
  Serial.print('/');
  Serial.print(now.Day(), DEC);
  Serial.print(" Time:");
  Serial.print(now.Hour(), DEC);
  Serial.print(':');
  Serial.print(now.Minute(), DEC);
  Serial.print(':');
  Serial.print(now.Second(), DEC);
}

String payloadToString(byte* payload, unsigned int length) {
  char buff_p[length];
  for (int i = 0; i < length; i++)
  {
    buff_p[i] = (char)payload[i];
  }
  buff_p[length] = '\0';
  return String(buff_p);
}

void callback(String topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  if(topic == "sensorIn") {
    if (payloadToString(payload, length) == "encenderAlarma") {
      sensorIsOn = true;
     }
     if (payloadToString(payload, length) == "apagarAlarma") {
      sensorIsOn = false;
     }
  }
  if(topic == "setAlarm") {
    StaticJsonDocument<256> doc;
    deserializeJson(doc, payload, length);
    alarmTimeIsSet = true;
    hhOn = doc["hourOn"].as<int>();
    mmOn = doc["minOn"].as<int>();
    
    hhOff = doc["hourOff"].as<int>();
    mmOff = doc["minOff"].as<int>();
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
      client.subscribe("sensorIn");
      client.subscribe("setAlarm");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void checkTime() {
  RtcDateTime now = Rtc.GetDateTime();
  if(now.Hour() == hhOn && now.Minute() == mmOn && now.Second() == 00){
    printNowTime(now);
    snprintf (msg, 75, "Sensor encendido", value);
    client.publish("sensorOut", msg);
    sensorIsOn = true;
  }
  if(now.Hour() == hhOff && now.Minute() == mmOff && now.Second() == 00){
    printNowTime(now);
    snprintf (msg, 75, "Sensor apagado", value);
    client.publish("sensorOut", msg);
    sensorIsOn = false;
  }
}

void alarmOn() {
  snprintf (msg, 75, "Hay movimiento", value);
  client.publish("alarmOut", msg);
  digitalWrite (BUILTIN_LED, LOW);
  digitalWrite (buzzer, LOW);
}

void alarmOff() {
  digitalWrite (BUILTIN_LED, HIGH);
  digitalWrite (buzzer, HIGH);
}

void sensor() {
  int state = digitalRead(pir);
  delay(500);                         //Check state of PIR after every half second
  
  if(state == HIGH){                
    alarmOn();
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
  setUp_rtc();
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  if(sensorIsOn) {
    sensor();
  } else {
    alarmOff();
  }

  if(alarmTimeIsSet) {
    checkTime();
  }
}
