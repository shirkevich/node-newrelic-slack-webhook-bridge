var config = require('./config.json');
var Slack = require('node-slack');

var slack = new Slack(config.slack.domain, config.slack.token);

function monitoringEvent(body){
	var msg = '[' + body.application_name + '][' + body.severity +
		'] <' + body.alert_url + '|' + body.message +
		'> -- ' + body.long_description;
	slack.send({
		text: msg
		,channel: config.slack.room
		,username: config.slack.sender
		,icon_url: 'http://i.imgur.com/ePrknxm.png'
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
		if (body.hasOwnProperty('severity')){
			monitoringEvent(body);
		}else{
			deployEvent(body);
		}
	}
};
