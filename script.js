const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Page load hote hi purane tasks load karna
document.addEventListener('DOMContentLoaded', getTasks);

function addTask() {
    if (taskInput.value.trim() === '') return;

    createTaskElement(taskInput.value);
    saveLocalTasks(taskInput.value);
    taskInput.value = '';
}

function createTaskElement(text) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="text">${text}</span>
        <div class="actions">
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    taskList.appendChild(li);
}

function deleteTask(btn) {
    const li = btn.parentElement.parentElement;
    removeLocalTasks(li.children.innerText);
    li.remove();
}

function editTask(btn) {
    const span = btn.parentElement.parentElement.querySelector('.text');
    const oldText = span.innerText;
    const newText = prompt("Apna kaam edit karein:", oldText);
    
    if (newText && newText.trim() !== "") {
        updateLocalTask(oldText, newText);
        span.innerText = newText;
    }
}

// Local Storage Functions
function saveLocalTasks(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task));
}

function removeLocalTasks(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const filteredTasks = tasks.filter(t => t !== taskText);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

function updateLocalTask(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = tasks.indexOf(oldText);
    if (index !== -1) tasks[index] = newText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}