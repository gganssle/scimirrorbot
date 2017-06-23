#!/usr/bin/env python

'''
Syntax:
python cleaner.py < tweets/grahamganssle.scrape > training/input.txt
'''

import re
import sys

inp = sys.stdin.read()

# remove links
outp = re.sub(r"http\S+", "", inp)
# remove the "RT" for retweet
outp = re.sub(r"RT ", "", outp)
# replace double + triple \n with singles
outp = re.sub(r"\n\n", "\n", outp)
outp = re.sub(r"\n\n\n", "\n", outp)
# remove emojis
emoji_pattern = re.compile("["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           "]+", flags=re.UNICODE)
outp = emoji_pattern.sub(r'', outp)

print(outp)
