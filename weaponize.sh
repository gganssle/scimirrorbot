#!/bin/bash

# init
USERNM=grahamganssle
CHKPNT=/home/ubuntu/scimirrorbot/dat/models/dictionary.t7
PRESTRING="@$USERNM "
TWEETY=/home/ubuntu/scimirrorbot/weap.txt

# subtract number of prestring characters from tweet
LENNY=$((139 - ${#PRESTRING}))

# build  tweet params
SEEDY=$(( ( RANDOM % 9999999998 ) + 1))
TEMP=$(( (RANDOM % 9) + 1 ))

for i in `seq 1 5`;
do
	# tweet to file
	echo $PRESTRING > $TWEETY
	cd /home/ubuntu/scimirrorbot/rnn/
	th sample.lua $CHKPNT -gpuid -1 -verbose 0 -seed $SEEDY -length $LENNY -temperature .$TEMP >> $TWEETY

	# push tweet live to Twitter
	cd /home/ubuntu/scimirrorbot/twitter_bot
	nodejs weaponize.js
	
	# output
	echo $i

	# don't redline the Twitter API
	sleep 5 
done
