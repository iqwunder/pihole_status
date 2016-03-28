#!/usr/bin/env bash

basename=pihole
piholeDir=/etc/$basename
adList=$piholeDir/gravity.list
adListOff=$adList.off

if [ -f $adList ]
  then
    echo "gravity.list exists... disabling pi-hole"
    sudo mv $adList $adListOff
  else
    echo "gravity.list does not exist. enabling pi-hole"
    sudo mv $adListOff $adList
fi
echo "restarting dnsmasq"
sudo service dnsmasq restart
