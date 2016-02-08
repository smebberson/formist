#!/usr/bin/env bash

if [ ! -e /etc/vagrant/setup ]
then

	echo ">>> setting up virtual machine"

	# install mocha
	npm install -g mocha

	echo ">>> virtual machine has been setup and is ready to go'"

	touch /etc/vagrant/setup

else

	echo ">>> virtual machine has already been setup"

fi
