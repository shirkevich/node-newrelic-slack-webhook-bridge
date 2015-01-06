var config = require('./config.json');
var Slack = require('./slack');

var slack = new Slack(config.slack.hook_url);

// function monitoringEvent(body){
// 	var msg = '[' + body.application_name + '][' + body.severity +
// 		'] <' + body.alert_url + '|' + body.message +
// 		'> -- ' + body.long_description;
// 	slack.send({
// 		text: msg,
// 		channel: config.slack.room,
// 		username: config.slack.sender,
// 		icon_url: 'http://i.imgur.com/ePrknxm.png'
// 	}, function(err, resp){
// 		if (err){
// 			console.error('ERROR:\n', err);
// 		}
// 	});
// }

// function deployEvent(body){
// 	var msg = '[' + body.application_name + '][' + body.created_at +
// 		'] <' + body.deployment_url + '|' + body.deployed_by +
// 		'> -- ' + body.description;
// 	slack.send({
// 		text: msg,
// 		channel: config.slack.room,
// 		username: config.slack.sender,
// 		icon_url: 'http://i.imgur.com/ePrknxm.png'
// 	}, function(err, resp){
// 		if (err){
// 			console.error('ERROR:\n', err);
// 		}
// 	});
// }

function prepareSlackMessage(body){
	if(typeof body.alert != 'undefined'){
		console.log('received an ALERT from New Relic. Contents: ');
		var alert = JSON.parse(body.alert);
		console.log(alert);

		var msg = '[' + alert.application_name + '][' + alert.severity +
		'] <' + alert.alert_url + '|' + alert.message +
		'> -- ' + alert.long_description;

		return msg;
	}

	if(typeof body.deployment != 'undefined'){
		console.log('received a DEPLOYMENT from New Relic. Contents: ');
		var deployment = JSON.parse(body.deployment);
		console.log(deployment);

		var msg = '[' + deployment.application_name + '][' + deployment.created_at +
		'] <' + deployment.deployment_url + '|' + deployment.deployed_by +
		'> -- ' + deployment.description;

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
