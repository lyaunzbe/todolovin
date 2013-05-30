var base = 'http://localhost:8080/';

var tasks = [];
$(function() {

	var taskElement = '<li> \
		<span id="task" ref="{{_id}}">Task: {{task}}</span> \
		<span id="date">Date: {{date}}</span> \
		<br>Tags: <span id="tags" contenteditable="true">{{tags}}</span> \
		<button type="button" class="del">Delete</button> \
		<input id="complete" name="complete" {{#complete}} checked {{/complete}} type="checkbox">';

	function getTasks(){
		$.ajax({
			type: "GET",
			url: base + 'todo'
		}).done(function(results){
			//populate taskList
			tasks.push(results);
			results.forEach(function(task){
				task.date = task.date.split('T')[0];

				$('#taskList ul').append(Mustache.render(taskElement, task));

			})
		});
	}

	function addTask(){
		//Split tags by comma and shove them into array
		var task = $('input[name="task"]').val(),
			tags = $('input[name="tags"]').val().split(" "),
			date = $('input[name="date"]').val();
		if(!task || !date){
			alert('Please input the proper fields');
			return;
		}
		var data = {
			task: task,
			tags: tags,
			date: date
		};

		console.log(data);
		$.ajax({
			type: "POST",
			url: base + 'todo',
			data: data,
			dataType: 'json',
			crossDomain: true
		}).done(function(result){
			//rest form
			$('input[name="task"]').val('');
			$('input[name="tags"]').val('');
			$('input[name="date"]').val('');
			//append result to todoList

			result.date = result.date.split('T')[0];
			var output = Mustache.render(taskElement, result);
			$('#taskList ul').append(output);
		});
	}

	function delTask(){
		var task = $(this).parent();
		var data = {
			_id : $(task).children('#task').attr('ref')
		};

		console.log(data);
		$.ajax({
			type: "DELETE",
			url: base + 'todo',
			data: data,
			dataType: 'json',
			crossDomain: true
		}).done(function(result){
			//delete element from list
			console.log('woo');
			$(task).remove();

		});
	}

	function completeTask(val, scope){
		var task = $(scope).parent();

		var data = {
			_id : $(task).children('#task').attr('ref'),
			complete: val
		};

		console.log(data);
		$.ajax({
			type: "PUT",
			url: base + 'todo',
			data: data,
			dataType: 'json',
			crossDomain: true
		}).done(function(result){
		});
	}

	getTasks();

	$('body').on('click', '.del', delTask);

	$('#todoSubmit').on('click',addTask);

	$('body').on('mousedown', '#complete', function() {
    	if (!$(this).is(':checked')) {
    		completeTask(true, this);
    	}else{
    		completeTask(false, this);
    	}
    });


});