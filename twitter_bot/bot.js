
// Dependencies =========================
var
    twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

// DATE BOT ==========================

var dte = Date();

Twitter.post('statuses/update', { status: dte }, function(err, data, response) {
  console.log(data)
})
