var test   = require('tap').test,
	Todo   = require('../models/todo.js');

var json    = {
	task: 'Buy milk.', 
	date: new Date(),
	tags: ['store', 'groceries'],
	meta: 'Xksdjiakdll==--'
}
var example = new Todo(json);

test('Model definition', function(t){
	t.ok(Todo, 'should be valid');
	t.type(Todo, 'function', 'Todo is a function that creates a todo obj');
	t.end();
});

test('Todo model', function(t){
	t.ok(example, 'should be valid');
	t.type(example, 'object', 'the example todo should be an obj');
	t.type(example.toJSON(), 'object', 'the example todo should return a valid json obj');
	t.end();
})