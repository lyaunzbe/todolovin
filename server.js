var restify = require('restify')
	routes  = require('./routes/index.js'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/');


var server = restify.createServer();

server.use(restify.bodyParser());

server.get('/todo', routes.todoGet);
server.post('/todo', routes.todoCreate);
server.del('/todo', routes.rm);
server.put('/todo', routes.complete)

server.listen(8080, function() {
  console.log('Server listening at %s', server.url);
});