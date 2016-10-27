var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send("<h1>hello from the other side<h1>");
});

app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 5000);


