// Get references to DOM elements
const todoInput = document.getElementById('todo-input');
const addTaskButton = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');
const cleanTaskButton = document.getElementById('clean-task');

// Initialize tasks array
let tasks = [];

// Add event listener for the add task button
addTaskButton.addEventListener('click', addTask);

// Function to add a new task
// function addTask() {
//   const task = todoInput.value;
//   tasks.push(task);
//   renderTasks();
//   todoInput.value = '';
// }

function addTask() {
  const task = todoInput.value;
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  todoInput.value = '';
  console.log(tasks);
}

// Add event listener for the clean-task button
cleanTaskButton.addEventListener('click', cleanTask);

// Function to clean tasks
// function cleanTask() {
//   tasks = [];
//   renderTasks();
// }

function cleanTask() {
  tasks = [];
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  console.log(tasks);
}


// // Function to render tasks
// function renderTasks() {
//   todoList.innerHTML = '';
//   tasks.forEach((task, index) => {
//     const li = createTaskElement(task, index);
//     todoList.appendChild(li);
//   });
// }

// Load tasks from localStorage when the page loads
window.addEventListener('DOMContentLoaded', (event) => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
});

// Array.prototype.map and the spread operator instead of function above
const renderTasks = () => {
  todoList.innerHTML = '';
  const taskElements = tasks.map((task, index) => createTaskElement(task, index));
  taskElements.forEach(element => todoList.appendChild(element));
};

// Function to add a new task when the enter key is pressed
todoInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Use template literals and destructuring assignment
const createTaskElement = (task, index) => {
  const li = document.createElement('li');
  const taskText = document.createElement('span');
  taskText.textContent = task;

  const [moveUpButton, moveDownButton, completeButton, editButton, deleteButton] =
    [createMoveUpButton(index), createMoveDownButton(index), createCompleteButton(taskText), createEditButton(task, index, li), createDeleteButton(index)];

  [taskText, moveUpButton, moveDownButton, completeButton, editButton, deleteButton].forEach(element => li.appendChild(element));

  return li;
};


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

    const icon = document.createElement('i');
    icon.className = 'material-icons-outlined';
    icon.textContent = 'save';
    saveButton.appendChild(icon);

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

  const icon = document.createElement('i');
  icon.className = 'material-icons-outlined';
  icon.textContent = 'delete';
  button.appendChild(icon);

  button.addEventListener('click', () => {
    tasks.splice(index, 1);
    renderTasks();
  });
  return button;
}

