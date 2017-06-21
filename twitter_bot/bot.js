
// Dependencies =========================
var
    twit = require('twit'),
    config = require('./config');
    stdio = require('stdio');

var Twitter = new twit(config);

// Options ===========================
var ops = stdio.getopt({
	'process': {key: 'p', args: 1, description: 'Which process to run', mandatory: true},
	'verbose': {key: 'v', args: 1, description: 'Print information: 1/0', default: 0}
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

// Execution ================================
if (ops.process == 'date') {
	console.log('im doing the date thing');
	dateBot();
} else if (ops.process == 'scrape') {
	name = 'sebastiangood'
	scrapeBot(name);
} else if (ops.process == 'followers') {
	name = 'grahamganssle';
	flwrBot(name);
} else {
	console.log(ops.process, 'isnt a valid process');
	if (ops.verbose == 1){ console.log('verbose is on') };
};
