var express = require('express'),
	handlers = require('./NewRelicWebhooks');

var app = express();

app.use(express.json());
app.use(express.urlencoded());

app.post('/newrelic/hook', function(req, resp){
	console.log('received a req: ');
	console.log(req.body);
	req.on('data', function(data){
		handlers.handlePost(JSON.parse(data));
	});
	resp.json({}).status(200);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function(){
	console.log('listening on port %s', port);
});
