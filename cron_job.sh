#!/bin/bash

# init
PUSHNO=$(( ( RANDOM % 13 ) ))

# tweet
cd /home/ubuntu/scimirrorbot/twitter_bot/
node /home/ubunt/scimirrorbot/twitter_bot/bot.js

# authenticate
eval $(ssh-agent -s)
ssh-add /home/ubuntu/.ssh/scimirrorbot-git

# push
cd /home/ubuntu/scimirrorbot/

if [ $PUSHNO = 0 ]; then
	echo zero
else
	for i in `seq 0 $PUSHNO`
	do
		date >> /home/ubuntu/scimirrorbot/logs/date.log
		git add *
		git commit -m '$date'
		git push origin master
	done
fi
