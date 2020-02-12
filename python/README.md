This folder contains a simple example for publishing and subscribing over MQTT with WAZIUP.

Install
=======

First install Python and pip if you don't have it:
```
sudo apt-get install python3-pip
```
Now install the library Paho-mqtt:
```
sudo pip3 install paho-mqtt
```

Run
===

Simply run:
```
python3 text.py
```

On the dashboard you can see the new value published:
```
https://dashboard.waziup.io/Devices/MyDevice
```
Any change to this sensor value will also be reported by your Python program.

