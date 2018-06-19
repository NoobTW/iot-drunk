#!/bin/bash

./python/drowsiness-detection/start.sh &
node server.js
killall python
