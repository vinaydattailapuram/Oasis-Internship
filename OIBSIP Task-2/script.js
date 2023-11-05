let taskList = [];

// Load tasks from local storage
if (localStorage.getItem('tasks')) {
    taskList = JSON.parse(localStorage.getItem('tasks'));
    displayTasks();
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskName = taskInput.value.trim();

    if (taskName !== '') {
        const newTask = {
            name: taskName,
            completed: false
        };
        taskList.push(newTask);
        taskInput.value = '';
        saveTasks();
        displayTasks();
    }
}

function displayTasks() {
    const taskListContainer = document.getElementById('task-list');
    taskListContainer.innerHTML = '';
    taskList.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.className = 'task' + (task.completed ? ' completed' : '');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => completeTask(index, checkbox.checked));
        taskElement.appendChild(checkbox);

        const taskNameElement = document.createElement('span');
        taskNameElement.className = 'task-name ' + (task.completed ? 'completed' : '');
        taskNameElement.textContent = task.name;
        taskElement.appendChild(taskNameElement);

        const deleteIconElement = document.createElement('i');
        deleteIconElement.className = 'fas fa-trash-alt delete-icon';
        deleteIconElement.addEventListener('click', () => showConfirmation(index));
        taskElement.appendChild(deleteIconElement);

        taskListContainer.appendChild(taskElement);
    });
}

function completeTask(index, completed) {
    taskList[index].completed = completed;
    saveTasks();
    displayTasks();
}

function confirmDeleteTask(index) {
    const confirmationModal = document.getElementById('confirmation-modal');
    const deleteButton = document.getElementById('confirm-delete');
    const cancelButton = document.getElementById('cancel-delete');

    confirmationModal.style.display = 'block';

    deleteButton.addEventListener('click', () => {
        deleteTask(index);
        confirmationModal.style.display = 'none';
    });

    cancelButton.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
    });
}

function deleteTask(index) {
    taskList.splice(index, 1);
    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

function showConfirmation(index) {
    const confirmationModal = document.getElementById('confirmation-modal');
    const deleteButton = document.getElementById('confirm-delete');
    const cancelButton = document.getElementById('cancel-delete');

    confirmationModal.style.display = 'block';

    deleteButton.addEventListener('click', () => {
        deleteTask(index);
        confirmationModal.style.display = 'none';
    });

    cancelButton.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
    });
}
