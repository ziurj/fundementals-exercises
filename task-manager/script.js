let tasks = JSON.parse(localStorage.getItem('tasks')); // Get from local storage

// Check if there are tasks available. If not, create a template to put on there for now.
if (!tasks) {
  tasks = [

    {
      taskName: 'TASK EXAMPLE NAME',
      completed: false,
      taskId: 0
    }

  ]
}

updateTasksDisplay();

const addButton = document.querySelector('.js-add-button');
const inputField = document.querySelector('.js-input-field');

inputField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

addButton.addEventListener('click', () => {
  addTask();
});

function addTask(completed = false) {
  const tasksSize = tasks.length;

  // Get the value from the input field and then clear it
  const taskName = inputField.value;
  if (!taskName) return;
  inputField.value = '';

  tasks.push({
    taskName: taskName,
    completed: completed,
    taskId: Date.now()
  });

  console.log(tasks);
  updateTasksDisplay();
}

function updateTasksDisplay() {
  const taskContainer = document.querySelector('.js-tasks-container');
  taskContainer.innerHTML = '';

  let newTasksHTML = '';

  tasks.forEach((task) => {
    // NOTE: Add the completed property later.
    // console.log(task.taskId);
    let taskClassList = `task__name`
    if (task.completed) 
      taskClassList += ` task__completed`;

    newTasksHTML += `
    
      <div class="task__container">
        <button class="task__check js-task-check" data-task-id=${task.taskId}>✓</button>
        <p class="${taskClassList} task-${task.taskId}">${task.taskName}</p>
        <button type="button" name="button" class="task__remove js-remove-button" data-task-id=${task.taskId}>Remove</button>
      </div>

    `
  });

  taskContainer.innerHTML = newTasksHTML;
  saveTaskData();

}

const taskContainer = document.querySelector('.js-tasks-container');
taskContainer.addEventListener('click', (e) => {
  if (e.target.matches('.js-task-check')) { 
    changeTaskStatus(e.target.dataset.taskId);
  }

  if (e.target.matches('.js-remove-button')) { 
    removeTask(e.target.dataset.taskId);
  }
});

function saveTaskData() {
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to local storage.
}

function removeTask(taskId) {
  const newTasks = [];

  tasks.forEach((task) => {
    if (task.taskId !== Number(taskId)) {
      newTasks.push(task);
    }
  });

  tasks = newTasks;
  updateTasksDisplay();
}

function changeTaskStatus(taskId) {
  tasks.forEach((task) =>  {
    if (task.taskId === Number(taskId)) {
      const taskElement = document.querySelector(`.task-${task.taskId}`);

      if (!task.completed) {
        task.completed = true;
        taskElement.classList.add('task__completed');
      } else {
        task.completed = false;
        taskElement.classList.remove('task__completed');
      }
    }
  });

  saveTaskData();
}