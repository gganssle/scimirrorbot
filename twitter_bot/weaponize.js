
// Dependencies =========================
var
    twit = require('twit'),
    config = require('./config');
    stdio = require('stdio');

var Twitter = new twit(config);

// BOT ==========================

tweetFile = '/home/ubuntu/scimirrorbot/weap.txt'

fs = require('fs');
fs.readFile(tweetFile, 'utf8', function(err,data){
	Twitter.post('statuses/update', 
	{ status: data }, 
	function(err, data, response) {
		
	})
})
