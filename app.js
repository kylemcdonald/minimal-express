var express = require('express');
var app = express();

app.use('/', express.static('public'));

app.get('/message', function (req, res) {
	res.send(process.env.MESSAGE);
});

var server = app.listen(process.env.PORT || 3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});