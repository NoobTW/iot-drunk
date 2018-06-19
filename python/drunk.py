import os
from gps import *
from time import *
import time
import threading
import json

gpsd = None #seting the global variable

os.system('clear') #clear the terminal (optional)

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
    os.system('clear')

    print
    print ' GPS reading'
    print '----------------------------------------'
    print 'latitude    ' , gpsd.fix.latitude
    print 'longitude   ' , gpsd.fix.longitude
    print 'time utc    ' , gpsd.utc,' + ', gpsd.fix.time
    print 'altitude (m)' , gpsd.fix.altitude
    print 'eps         ' , gpsd.fix.eps
    print 'epx         ' , gpsd.fix.epx
    print 'epv         ' , gpsd.fix.epv
    print 'ept         ' , gpsd.fix.ept
    print 'speed (m/s) ' , gpsd.fix.speed
    print 'climb       ' , gpsd.fix.climb
    print 'track       ' , gpsd.fix.track
    print 'mode        ' , gpsd.fix.mode
    print
    print 'sats        ' , gpsd.satellites

    time.sleep(1) #set to whatever

  dict = {};
  dict['lat'] = gpsd.fix.latitude
  dict['lng'] = gpsd.fix.longitude
  dict['alt'] = gpsd.fix.altitude
  dict['speed'] = gpsd.fix.speed
  os.system('clear')
  data = json.dumps(dict)
  print(data)

  gpsp.running = False
  gpsp.join() # wait for the thread to finish what it's doing