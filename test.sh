#!/bin/bash
var1=0
while read -r; do
  ((var1=$var1+1))
  printf "press enter\r\n$var1\r"
done