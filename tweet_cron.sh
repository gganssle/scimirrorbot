#!/bin/bash

# init
USERNM=grahamganssle
CHKPNT=/home/ubuntu/scimirrorbot/dat/models/$USERNM.t7
PRESTRING=".@$USERNM says: "
TWEETY=/home/ubuntu/scimirrorbot/most_recent_tweet.txt

# subtract number of prestring characters from tweet
LENNY=$((139 - ${#PRESTRING}))

# build  tweet params
SEEDY=$(( ( RANDOM % 9999999998 ) + 1))
TEMP=$(( (RANDOM % 9) + 1 ))

i# tweet to file
echo $PRESTRING > $TWEETY
cd /home/ubuntu/scimirrorbot/rnn/
th sample.lua $CHKPNT -gpuid -1 -verbose 0 -seed $SEEDY -length $LENNY -temperature .$TEMP >> $TWEETY

# push tweet live to Twitter
cd /home/ubuntu/scimirrorbot/twitter_bot
nodejs bot.js -p tweet
