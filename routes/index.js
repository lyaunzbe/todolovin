
function Routes(mongoose){

	var Todo = require('../models/todo.js')(mongoose);

	var routes =  {

		todoGet: function(req, res){
			Todo.find(function(err, result){
				if(err) callback(err);
				res.header('Access-Control-Allow-Origin','*');
		 		res.json(result);

			})
		},

		todoCreate: function(req, res){
			var todo = new Todo(req.params);
			todo.save(function(err){
				if(err) return callback(err);
				Todo.findById(todo, function(err, result){
					if(err) return callback(err);
					res.header('Access-Control-Allow-Origin','*');
		 			res.json(result);
				});
			});
		},

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

	return routes;
};

module.exports = Routes;