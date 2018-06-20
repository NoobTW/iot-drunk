#!/bin/bash

./python/drowsiness-detection/start.sh &
node server.js
sleep 5
killall python
