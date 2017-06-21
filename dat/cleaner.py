#!/usr/bin/env python

import re

with open('20170620.scrape', 'r') as f:
	inp = f.read()

# remove links
outp = re.sub(r"http\S+", "", inp)
# remove the "RT" for retweet
outp = re.sub(r"RT ", "", outp)
# replace double + triple \n with singles
outp = re.sub(r"\n\n", "\n", outp)
outp = re.sub(r"\n\n\n", "\n", outp)

with open('20170620.clean', 'w') as f:
	f.write(outp)
