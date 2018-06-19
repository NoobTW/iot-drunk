import os
from gps import *
from time import *
import serial
import time
import threading
import json

ser = serial.Serial('/dev/ttyUSB0',9600)
read_serial = ser.readline()

gpsd = None #seting the global variable

class GpsPoller(threading.Thread):
  def __init__(self):
    threading.Thread.__init__(self)
    global gpsd #bring it in scope
    gpsd = gps(mode=WATCH_ENABLE) #starting the stream of info
    self.current_value = None
    self.running = True #setting the thread running to true

  def run(self):
    global gpsd
    while gpsp.running:
      gpsd.next() #this will continue to loop and grab EACH set of gpsd info to clear the buffer

if __name__ == '__main__':
  gpsp = GpsPoller() # create the thread
  gpsp.start() # start it up
  #It may take a second or two to get good data
  #print gpsd.fix.latitude,', ',gpsd.fix.longitude,'  Time: ',gpsd.utc
  while gpsd.fix.latitude == 0:

    time.sleep(1) #set to whatever

  dict = {};
  dict['lat'] = gpsd.fix.latitude
  dict['lng'] = gpsd.fix.longitude
  dict['alt'] = gpsd.fix.altitude
  dict['speed'] = gpsd.fix.speed
  dict['mq3'] = read_serial
  data = json.dumps(dict)
  print(data)

  gpsp.running = False
  gpsp.join() # wait for the thread to finish what it's doing
