var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');  // pull information from HTML POST (express4)


app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

mongoose.connect('mongodb://utkarsh:utkarsh@ds137267.mlab.com:37267/tododb');

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	name: String,
	status: String
});

var Todo = mongoose.model('Todo',TodoSchema);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
	Todo.find(function(err, todos){
		if(err)
		res.send(err);
		res.json(todos);
	});
});
app.post('/',function(req,res){
	Todo.create({
		name: req.body.name
		}, function(err){
			if(err)
			res.send(err);
		Todo.find(function(err, todos){
			if(err)
			res.send(err);
			res.json(todos);
		});
	});	
});
app.put('/', function(req, res){
	var updateObj = req.body; 
	var uPropName = updateObj.uPropName; 
	var update = {};
	var condition = {};
	update[uPropName] = updateObj.uPropValue;
	condition['_id']  = updateObj.id;
	Todo.update(condition, update, function(err, num){
		if(err)
			res.send(err);
		res.status(200).send(num);
	});
	
});
app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 5000, function(){
	console.log("server is up");
});


