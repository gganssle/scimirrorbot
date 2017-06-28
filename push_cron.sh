#!/bin/bash

# init
PUSHNO=$(( ( RANDOM % 3 ) ))

# authenticate
eval $(ssh-agent -s)
ssh-add /home/ubuntu/.ssh/scimirrorbot-git

# push
cd /home/ubuntu/scimirrorbot/

if [ $PUSHNO = 0 ]; then
	echo no updates today: $(date) >> /home/ubuntu/scimirrorbot/logs/date.log
else
	for i in `seq 0 $PUSHNO`
	do
		date >> /home/ubuntu/scimirrorbot/logs/date.log
		git add *
		git commit -m '$date'
		git push origin master
	done
fi
