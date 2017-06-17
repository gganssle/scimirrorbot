#!/bin/bash

# work
date >> /home/ubuntu/scimirrorbot/logs/test.log

# authenticate
eval $(ssh-agent -s)
ssh-add /home/ubuntu/.ssh/scimirrorbot-git

# push
cd /home/ubuntu/scimirrorbot/
git add *
git commit -m '$date'
git push origin master
