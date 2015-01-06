var config = require('./config.json');
var Slack = require('./slack');

var slack = new Slack(config.slack.hook_url);

function prepareSlackMessage(body){
	if(typeof body.alert != 'undefined'){
		var alert = JSON.parse(body.alert);
		var msg = 'Alert for application: ' + alert.application_name + ' (severity: ' + alert.severity +
		'): <' + alert.alert_url + '|' + alert.message +
		'> (' + alert.long_description + ')';
		return msg;
	}

	if(typeof body.deployment != 'undefined'){
		var deployment = JSON.parse(body.deployment);
		var msg = 'Deployment notification for ' + deployment.application_name + ': <' + deployment.deployment_url + '|' + deployment.description +
		'> (deployed by ' + deployment.deployed_by + ')';
		return msg;
	}
}

function sendSlackMessage(message){
	slack.send({
		text: message,
		channel: config.slack.room,
		username: config.slack.sender,
		icon_url: 'http://i.imgur.com/ePrknxm.png'
	}, function(err, resp){
		if (err){
			console.error('ERROR:\n', err);
		}
	});
}

module.exports = {
	handlePost: function(body){
		var message = prepareSlackMessage(body);
		sendSlackMessage(message);
	}
};
