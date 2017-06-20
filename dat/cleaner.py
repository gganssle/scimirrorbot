#!/usr/bin/env python

import re

with open('20170620.scrape', 'r') as f:
	inp = f.read()

outp = re.sub(r"http\S+", "", inp)

with open('20170620.clean', 'w') as f:
	f.write(outp)
