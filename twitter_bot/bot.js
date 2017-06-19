
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

// Init Globals===========================
//var global1 = 0;

// BOTS ==========================

var dateBot = function(){
	// grab date
	var dte = Date();

	// tweet date
	Twitter.post('statuses/update', { status: dte }, function(err, data, response) {
	  if (ops.verbose == 1){ console.log(data) }
	})
}

var scrapeBot = function(name) {
	// grab list of followers
	Twitter.get('followers/list', { screen_name: name }, 
	  function (err, data, response) {
		// debugging
		if (ops.verbose == 1){ console.log(data) };
		//console.log(data.users[0].screen_name);

		// grab tweets from follower
		Twitter.get('statuses/user_timeline', 
		  {screen_name: data.users[0].screen_name, count: 200},
		  function (err2, data2, response2) {
			for (i = 0; i < data2.length; i++) {
				console.log(data2[i].text);
				tempid = data2[i].id;
			};
			width = 200;
			while (width == 200) {
				Twitter.get('statuses/user_timeline',
				  {screen_name: data.users[0].screen_name, count: 200, max_id: tempid},
				  function (err3, data3, response3) {
					for (j = 0; j < data3.length; j++) {
						console.log(data3[j].text);
						tempid = data3[i].id;
					};
					width = data3.length;
				});
			};//the problem here is that you can't emit any information back out of the functions contained inside of the Twit API calls. That means you can't call other functions or save data in memory or anything. This is a terrible way of writing this shit. I guess the next step is to find some acceptable tweet number for training and just for loop it over that number whether the data is there or not.
			
		})
	})
}

// Execution ================================
if (ops.process == 'date') {
	console.log('im doing the date thing');
	dateBot();
} else if (ops.process == 'scrape') {
	name = 'grahamganssle'
	scrapeBot(name);
} else {
	console.log(ops.process, 'isnt a valid process');
	if (ops.verbose == 1){ console.log('verbose is on') };
};
