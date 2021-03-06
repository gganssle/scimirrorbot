
// Dependencies =========================
var
    twit = require('twit'),
    config = require('./config');
    stdio = require('stdio');

var Twitter = new twit(config);

// Options ===========================
var ops = stdio.getopt({
	'process': {key: 'p', args: 1, description: 'Which process to run', mandatory: true},
	'verbose': {key: 'v', args: 1, description: 'Print information: 1/0', default: 0},
	'usernme': {key: 'u', args: 1, description: 'Screenname of user to scrape', default: ''}
});

// BOTS ==========================

var dateBot = function(){
	// grab date
	var dte = Date();

	// tweet date
	Twitter.post('statuses/update', 
	{ status: dte }, 
	function(err, data, response) {
		if (ops.verbose == 1){ console.log(data) }
	})
}

var scrapeBot = function(name) {
	// get tweets from user
	Twitter.get('statuses/user_timeline', { screen_name: name, count: 200 }, 
	function (err, data, response) {
		// debugging
		if (ops.verbose == 1){ console.log(data) };
		
		// print tweets
		for (i = 0; i < data.length; i++) {
			console.log(data[i].text);
		};

		nxttwts(name, data[data.length - 1].id, data[0].id);
	})

	var nxttwts = function(name, lastid, firstid) {
		Twitter.get('statuses/user_timeline', 
		{ screen_name: name, count: 200, max_id: lastid },
		function (err, data, response) {
			for (i = 0; i < data.length; i++) {
				console.log(data[i].text);
			}

			if (lastid != firstid) {
				nxttwts(name, data[data.length - 1].id, data[0].id);
			}
		})
	}

}

var flwrBot = function(name) {

	Twitter.get('followers/list', { screen_name: name, count: 200},
	function(err, data, response) {

		for (i = 0; i < data.users.length; i++) {
			console.log(data.users[i].screen_name)
		}
	})
}

var tweetBot = function(tweetFile) {
	fs = require('fs');
	fs.readFile(tweetFile, 'utf8', function(err,data){
		Twitter.post('statuses/update', 
		{ status: data }, 
		function(err, data, response) {
			if (ops.verbose == 1){ console.log(data) }
		})

	})
}

var friendslist = function(name) {
	Twitter.get('friends/list', { screen_name: name, count: 200 }, 
	function (err, data, response) {
		// debugging
		if (ops.verbose == 1){ console.log(data) };
		
		// print friends
		for (i = 0; i < data.users.length; i++) {
			console.log(data.users[i].screen_name);
		};

		nxtfrnds(name, data.next_cursor, data.previous_cursor);
	})

	var nxtfrnds = function(name, lastid, firstid) {
		Twitter.get('friends/list', 
		{ screen_name: name, count: 200, cursor: lastid },
		function (err, data, response) {
			console.log('previous cursor = ' + data.previous_cursor);

			for (i = 0; i < data.users.length; i++) {
				console.log(data.users[i].screen_name);
			}
			console.log('next cursor = ' + data.next_cursor);

			if (lastid != firstid) {
				nxtfrnds(name, data.next_cursor, data.previous_cursor);
			}
		})
	}

}

// Execution ================================
if (ops.process == 'date') {
/* Syntax:
	nodejs bot.js -p date
*/
	console.log('im doing the date thing');
	dateBot();

} else if (ops.process == 'listfriends') {
/* Syntax:
	nodejs bot.js -p listfriends ../dat/friendsList_201706231600
*/
	friendslist('scimirrorbot');

} else if (ops.process == 'tweet') {
/* Syntax:
	nodejs bot.js -p tweet
*/
	var tweetFile = '/home/ubuntu/scimirrorbot/most_recent_tweet.txt';
	tweetBot(tweetFile);

} else if (ops.process == 'scrape') {
/* Syntax:
	nodejs bot.js -p scrape -u grahamganssle > ../dat/tweets/grahamganssle.scrape
*/
	if (ops.usernme == '') {
		throw new Error("YOU NEED TO SUPPLY A USERNAME USING THE -u FLAG.");
	}
	name = ops.usernme;
	scrapeBot(name);

} else if (ops.process == 'followers') {
/* Syntax:
	nodejs bot.js -p followers 
*/
	name = ops.usernme;
	flwrBot(name);

} else {
	console.log(ops.process, 'isnt a valid process');
	if (ops.verbose == 1){ console.log('verbose is on') };
};
