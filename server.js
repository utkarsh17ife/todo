var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
	res.send("hello from the other side");
});

app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 5000);


