
// Dependencies =========================
var
    twit = require('twit'),
    config = require('./config');
    stdio = require('stdio');

var Twitter = new twit(config);

// Options ===========================
var ops = stdio.getopt({
    'process': {key: 'p', minArgs: 1, description: 'Which process to run', mandatory: true}
});

// DATE BOT ==========================

var dateBot = function(){
	// grab date
	var dte = Date();

	// tweet date
	Twitter.post('statuses/update', { status: dte }, function(err, data, response) {
	  console.log(data)
	})

}

// Execution ================================
//dateBot();


console.log(ops);
