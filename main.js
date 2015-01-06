var express = require('express'),
	handlers = require('./NewRelicWebhooks');

var app = express();

app.use(express.json());
app.use(express.urlencoded());

app.post('/newrelic/hook', function(req, resp){
	console.log('received a req, forcing pass to POST handler: ');
	console.log(req.body);
	handlers.handlePost(req.body);
	// req.on('data', function(data){
	// 	console.log('passing the request to POST handler (on.data)');
	// 	handlers.handlePost(JSON.parse(data));
	// });
	resp.json({}).status(200);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function(){
	console.log('listening on port %s', port);
});
