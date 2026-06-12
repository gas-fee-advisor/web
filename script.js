// Elements ko select karna
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');

// Page load hote hi purana data load karein
document.addEventListener('DOMContentLoaded', loadTasks);

// Add Task Function
addBtn.addEventListener('click', addTask);

// Enter key dabane par bhi task add ho jaye
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const text = taskInput.value.trim();
    
    if (text === "") {
        alert("Kripya kuch likhein!");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    createTaskElement(task);
    saveTaskToLocal(task);
    
    taskInput.value = ""; // Input clear karein
    checkEmptyState();
}

// Task ko HTML mein dikhana
function createTaskElement(task) {
    const li = document.createElement('li');
    if (task.completed) {
        li.classList.add('completed');
    }
    li.setAttribute('data-id', task.id);

    li.innerHTML = `
        <span>${task.text}</span>
        <div class="actions">
            <button class="btn-check" onclick="toggleComplete(${task.id})">✔</button>
            <button class="btn-delete" onclick="deleteTask(${task.id})">✖</button>
        </div>
    `;

    taskList.prepend(li); // Naya task upar dikhaye
}

// Task ko Local Storage mein save karna
function saveTaskToLocal(task) {
    let tasks = getTasksFromLocal();
    tasks.push(task);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// Local Storage se tasks lana
function getTasksFromLocal() {
    let tasks;
    if (localStorage.getItem('myTasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('myTasks'));
    }
    return tasks;
}

// Purane tasks load karna
function loadTasks() {
    const tasks = getTasksFromLocal();
    tasks.forEach(task => createTaskElement(task));
    checkEmptyState();
}

// Task Complete/Uncomplete karna
function toggleComplete(id) {
    let tasks = getTasksFromLocal();
    tasks.forEach(task => {
        if (task.id === id) {
            task.completed = !task.completed; // Toggle state
        }
    });
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    
    // UI update karna
    const li = document.querySelector(`li[data-id="${id}"]`);
    li.classList.toggle('completed');
}

// Task Delete karna
function deleteTask(id) {
    let tasks = getTasksFromLocal();
    // Us ID wale task ko remove karna
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    
    // UI se hata dena
    const li = document.querySelector(`li[data-id="${id}"]`);
    li.remove();
    checkEmptyState();
}

// Empty state check karna
function checkEmptyState() {
    const tasks = getTasksFromLocal();
    if (tasks.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}