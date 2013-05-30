var Todo = require('../models/todo.js');

var createTodo = function(req, res, callback){
	var todo = new Todo(req.params);
	todo.save(function(err){
		if(err) return callback(err);
		Todo.findById(todo, function(err, doc){
			if(err) return callback(err);
			callback(null,doc);
		})
	})
};

var getTodo = function(req, res, callback){
	Todo.find(function(err, result){
		if(err) callback(err);
		callback(null, result);
	})
}
var todo = function(req, res){
	if(req.method === 'GET'){
		getTodo(req, res, function(err, result){
			res.header('Access-Control-Allow-Origin','*');
			res.json(result);
		});
	}else{
		createTodo(req, res, function(err, result){
			if(err) console.log(err);
			res.header('Access-Control-Allow-Origin','*');
			res.json(result);
		});
	}
};


module.exports = {

	todo: todo,

	rm: function(req, res) {
		Todo.findByIdAndRemove(req.params._id, function(err, result){
			if(err) console.log(err);
			res.header('Access-Control-Allow-Origin','*');
			res.json(result);
			console.log('Removed' + result);
		});
	},

	complete: function(req, res) {
		Todo.findByIdAndUpdate(req.params._id, {complete:req.params.complete}, function(err, result){
			if(err) console.log(err);
			res.header('Access-Control-Allow-Origin','*');
			res.json(result);
			console.log('Updated' + result);
		})

	},

	tag: function(req, res) {

	}

}