var config = require('./config.json');
var Slack = require('./slack');

var slack = new Slack(config.slack.hook_url);

function monitoringEvent(body){
	var msg = '[' + body.application_name + '][' + body.severity +
		'] <' + body.alert_url + '|' + body.message +
		'> -- ' + body.long_description;
	slack.send({
		text: msg,
		channel: config.slack.room,
		username: config.slack.sender,
		icon_url: 'http://i.imgur.com/ePrknxm.png'
	}, function(err, resp){
		if (err){
			console.error('ERROR:\n', err);
		}
	});
}

function deployEvent(body){
	console.log('deploy event', body);
}

module.exports = {
	handlePost: function(body){
		console.log('received a post to handle: ');
		console.log(body);
		if (body.hasOwnProperty('severity')){
			console.log('post has a property "severity"');
			monitoringEvent(body);
		}else{
			console.log('post does *not* have a property "severity"');
			deployEvent(body);
		}
	}
};
