require('dotenv').config();
var fs = require('fs');
var multer  = require('multer');
var express = require('express');
var app = express();

app.use('/', express.static('public'));

app.get('/message', function (req, res) {
	res.send(process.env.MESSAGE);
});

var uploadImage = multer({ dest: 'uploads/' }).fields([
  { name: 'image' },
  { name: 'email' }
]);
app.post('/upload', uploadImage, function (req, res) {
	res.end();
	console.log('uploaded file to ' + req.files.image[0].filename + ' for ' + req.body.email);
})

var uploadLog = multer().none();
var logStream = fs.createWriteStream('log.txt', { flags: 'a' });
app.post('/log', uploadLog, function (req, res) {
	res.end();
	logStream.write(JSON.stringify(req.body) + '\n');
})

var server = app.listen(process.env.PORT || 3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});