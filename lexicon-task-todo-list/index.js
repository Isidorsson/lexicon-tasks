// Get references to DOM elements
const todoInput = document.getElementById('todo-input');
const addTaskButton = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');

// Initialize tasks array
let tasks = [];

// Add event listener for the add task button
addTaskButton.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
  const task = todoInput.value;
  tasks.push(task);
  renderTasks();
  todoInput.value = '';
}

// Function to render tasks
function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = createTaskElement(task, index);
    todoList.appendChild(li);
  });
}

// Function to create a task element
function createTaskElement(task, index) {
  const li = document.createElement('li');
  const taskText = document.createElement('span');
  taskText.textContent = task;

  const moveUpButton = createMoveUpButton(index);
  const moveDownButton = createMoveDownButton(index);
  const completeButton = createCompleteButton(taskText);
  const editButton = createEditButton(task, index, li);
  const deleteButton = createDeleteButton(index);

  li.appendChild(taskText);
  li.appendChild(moveUpButton);
  li.appendChild(moveDownButton);
  li.appendChild(completeButton);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  return li;
}
// Function to create a move up button
function createMoveUpButton(index) {
  const button = document.createElement('button');

  const icon = document.createElement('i');
  icon.className = 'material-icons-outlined';
  icon.textContent = 'arrow_upward';
  button.appendChild(icon);

  button.addEventListener('click', () => {
    if (index > 0) {
      const temp = tasks[index];
      tasks[index] = tasks[index - 1];
      tasks[index - 1] = temp;
      renderTasks();
    }
  });
  return button;
}


// Function to create a move down button
function createMoveDownButton(index) {
  const button = document.createElement('button');

  const icon = document.createElement('i');
  icon.className = 'material-icons-outlined';
  icon.textContent = 'arrow_downward';
  button.appendChild(icon);

  button.addEventListener('click', () => {
    if (index < tasks.length - 1) {
      const temp = tasks[index];
      tasks[index] = tasks[index + 1];
      tasks[index + 1] = temp;
      renderTasks();
    }
  });
  return button;
}

// Function to create a complete button
function createCompleteButton(taskText) {
  const button = document.createElement('button');

  const icon = document.createElement('i');
  icon.className = 'material-icons-outlined';
  icon.textContent = 'done';
  button.appendChild(icon);


  button.addEventListener('click', () => {
    taskText.style.textDecoration = taskText.style.textDecoration === 'line-through' ? 'none' : 'line-through';
  });
  return button;
}

// Function to create an edit button
function createEditButton(task, index, li) {
  const button = document.createElement('button');

  const icon = document.createElement('i');
  icon.className = 'material-icons-outlined';
  icon.textContent = 'edit';
  button.appendChild(icon);

  button.addEventListener('click', () => {
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.value = task;
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
      tasks[index] = newInput.value;
      renderTasks();
    });

    li.innerHTML = '';
    li.appendChild(newInput);
    li.appendChild(saveButton);
  });
  return button;
}
// Function to create a delete button
function createDeleteButton(index) {
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.addEventListener('click', () => {
    tasks.splice(index, 1);
    renderTasks();
  });
  return button;
}