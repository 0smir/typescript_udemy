#!/bin/bash

echo "tsc $1" > /tmp/bat_example.bat
cmd.exe < /tmp/bat_example.bat
