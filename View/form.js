const timeout = 500;
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
	setTimeout(updateTask, timeout);
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
	/*event.preventDefault();
	const form = new FormData(deleteForm);
	const taskId = form.get('taskId');
	deleteTask(taskId);
	deleteForm.reset();
	taskList.innerHTML = "";
	setTimeout(updateTask, 500);*/
	if (selectedId > 0) {
		deleteTask(selectedId);
		selectedId = 0;
		taskList.innerHTML = "";
		setTimeout(updateTask, timeout);
	}
})

function deleteTask(taskId){
	fetch(taskEndpoint + `/${taskId}`, {method: 'DELETE'});
}

let selectedId = 0;
const display = document.getElementById('display');

taskList.addEventListener('click', function(event){
	event.preventDefault();
	console.log(event.target);
	if (event.target.tagName === 'LI'){
		selectedId = event.target.getAttribute('id');
		let element = document.createElement('span');
		element.innerText = selectedId;
		display.innerHTML = element.outerHTML;
		//deleteForm.getElementsByTagName('input').innerText = selectedId;
	}
})

updateTask();

