#!/usr/bin/env python3

import paho.mqtt.client as mqtt

# This is the Subscriber

def on_connect(client, userdata, flags, rc):
  print("Connected with result code "+str(rc))
  client.subscribe("devices/MyDevice/sensors/TC1/value")

def on_message(client, userdata, msg):
  print("new value!")
  print(msg.payload.decode())
  client.disconnect()
    
client = mqtt.Client()
client.connect("api.waziup.io")

client.on_connect = on_connect
client.on_message = on_message

client.publish("devices/MyDevice/sensors/TC1/value", '{"value": "39"}');


client.loop_forever()


