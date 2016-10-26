var express = require('express');
var app = express();


app.get('/', function(req, res){
	res.send("hello from the other side");
});

app.listen(process.env.port || 8080);
console.log("server is up on 8080");

