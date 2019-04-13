#!/bin/bash

function print () {
  echo -e "\e[32mBuilding $1\e[0m"
}

print "Boltz-frontend"
docker build -t boltz/frontend -f Dockerfile .
