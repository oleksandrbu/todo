const timeout = 500;
const responseForm = document.getElementById('responseForm');
const taskList = document.getElementById('taskList');
const deleteForm = document.getElementById('deleteForm');
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
	if (task.name && task.name.length > 0) {
		addTask(task);
		responseForm.reset();
		taskList.innerHTML = "";
		setTimeout(updateTask, timeout);
	}
})

function appendTask(task) {
	const listElement = document.createElement('li');
	listElement.setAttribute("id", task.id);
	listElement.innerHTML = `<input type="checkbox"><span>${task.id}. ${task.name}</span>`;
	taskList.appendChild(listElement);
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

deleteForm.addEventListener('submit', function(event){
	event.preventDefault();
	const form = new FormData(deleteForm);
	const taskId = form.get('taskId');
	if (taskId > 0){
		deleteTask(taskId);
		deleteForm.reset();
		taskList.innerHTML = "";
		setTimeout(updateTask, timeout);
	}
})

function deleteTask(taskId){
	fetch(taskEndpoint + `/${taskId}`, {method: 'DELETE'});
}

taskList.addEventListener('click', function(event){
	event.preventDefault();
	if (event.target.tagName === 'LI'){
		document.querySelector('#taskId').value = event.target.getAttribute('id');
	}
})

updateTask();

