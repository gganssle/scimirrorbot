#!/bin/bash

# init
SMBDIR=/home/ubuntu/scimirrorbot
FRNDLST=$SMBDIR/dat/friendsList.txt
MODLDIR=$SMBDIR/dat/models
DATADIR=$SMBDIR/dat/tweets
TRANDIR=$SMBDIR/dat/training
TWEETY=$SMBDIR/most_recent_tweet.txt

CURUSR=$( head -1 $FRNDLST )
NXTUSR=$( head -2 $FRNDLST | tail -1 )
TRNUSR=$( head -3 $FRNDLST | tail -1 )

# clean up the model folder
LSTEPC=$( ls -t1 $MODLDIR | head -1 )
mv $MODLDIR/$LSTEPC $MODLDIR/$NXTUSR.t7
rm $MODLDIR/lm_*

# clean up the raw tweets folder
rm $DATADIR/*

# tweet about changing users
echo Goodbye, @$CURUSR. Next up: @$NXTUSR! > $TWEETY
cd $SMBDIR/twitter_bot
nodejs bot.js -p tweet

# extract new data
nodejs bot.js -p scrape -u $TRNUSR > $DATADIR/$TRNUSR.scrape

# clean new data
cd $SMBDIR/dat
python cleaner.py < $DATADIR/$TRNUSR.scrape > $TRANDIR/input.txt

# start new training session
cd $SMBDIR/rnn
(time th train.lua -data_dir $TRANDIR -batch_size 10 -gpuid -1 -checkpoint_dir $MODLDIR -savefile $TRNUSR ) &> training.log &

# swap user positions in friends file
cd $SMBDIR/dat
sed '1d' friendsList.txt > tmpfile; mv tmpfile friendsList.txt

