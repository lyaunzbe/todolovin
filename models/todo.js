var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({

	task: String,
	date: { type: Date, default: Date.now },
	tags: {type: Array, default: null },
	meta: {type: String, default: null},
	createdAt : {type:Date, default: Date.now},
	complete: Boolean
});

module.exports = mongoose.model('Todo', todoSchema);