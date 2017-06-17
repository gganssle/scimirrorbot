#!/bin/bash

date >> /home/ubuntu/scimirrorbot/logs/test.log

cd /home/ubuntu/scimirrorbot/
git add *
git commit -m '$date'
git push origin master
