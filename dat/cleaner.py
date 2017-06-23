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

print(outp)
