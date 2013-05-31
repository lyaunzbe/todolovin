function TodoModel(mongoose){

	var todoSchema = mongoose.Schema({

		task: String,
		date: { type: Date, default: Date.now },
		tags: {type: Array, default: null },
		meta: {type: String, default: null},
		createdAt : {type:Date, default: Date.now},
		complete: Boolean
	});

	return mongoose.model('Todo', todoSchema);
}


module.exports = TodoModel;