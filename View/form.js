const responseForm = document.getElementById('responseForm');
const taskList = document.getElementById('taskList');
const taskEndpoint = "http://localhost:5000/api/tasks";

class Task{
	constructor(taskname){
		this.name = taskname;
	}
}

responseForm.addEventListener('submit', function(event){
	event.preventDefault();
	const form = new FormData(responseForm);
	const task = new Task(form.get('taskName'))
	addTask(task);
	responseForm.reset();
	taskList.innerHTML = "";
	setTimeout(updateTask, 1000);
})

function appendTask(newTask) {
	const {name, id} = newTask;
	if (name && name.length > 0){
		const listElement = document.createElement('li');
		listElement.setAttribute("id", id);
		listElement.innerHTML = `<input type="checkbox"><span>${id}. ${name}</span>`;
		taskList.appendChild(listElement);
	}
}

function updateTask(){
	fetch(taskEndpoint)
		.then(response => response.json())
		.then(tasks => tasks.forEach(appendTask));
}

function addTask(task){
	fetch(taskEndpoint, {method: 'POST', 
	headers:  {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(task)});
}

const deleteForm = document.getElementById('deleteForm');

deleteForm.addEventListener('submit', function(event){
	event.preventDefault();
	const form = new FormData(deleteForm);
	const taskId = form.get('taskId');
	deleteTask(taskId);
	deleteForm.reset();
	taskList.innerHTML = "";
	setTimeout(updateTask, 500);
})

function deleteTask(taskId){
	fetch(taskEndpoint + `/${taskId}`, {method: 'DELETE'});
}

updateTask();