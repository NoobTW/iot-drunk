#!/bin/bash
cd "$(dirname "$0")"
python detect_drowsiness_picam.py --shape-predictor shape_predictor_68_face_landmarks.dat --alarm alarm.wav
