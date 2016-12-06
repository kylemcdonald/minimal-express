require('dotenv').config();
var multer  = require('multer');
var express = require('express');
var app = express();

app.use('/', express.static('public'));

app.get('/message', function (req, res) {
	res.send(process.env.MESSAGE);
});

var upload = multer({ dest: 'uploads/' });
var uploadImage = upload.fields([
  { name: 'image' },
  { name: 'email' }
]);
app.post('/upload', uploadImage, function (req, res, next) {
  res.sendStatus(200);
  console.log('uploaded file to ' + req.files.image[0].filename + ' for ' + req.body.email);
})

var server = app.listen(process.env.PORT || 3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});