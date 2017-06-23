var
    twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

var name = 'grahamganssle'

Twitter.get('followers/ids', { screen_name: name, count: 5000},
function(err, data, response) {
	console.log('The user', name, 'has', data.ids.length, 'followers.');

	for (i = 0; i < data.ids.length; i++) {
		check(data.ids[i])
	}
})

var follow = function(id) {
	Twitter.post('friendships/create', { user_id: id })
}

var check = function(id) {
	Twitter.get('users/show', {user_id: id}, function(err, data, resp){
		console.log(data.name, 'has posted', data.statuses_count, 'tweets.');
		
		if (data.statuses_count > 1000) {
			//follow(id);
			console.log('\n');
			console.log(data.name, 'has posted', data.statuses_count, 'tweets.');
		}
	})
}
