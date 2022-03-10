const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

console.log(uuid());

const tasksPath = path.join(__dirname, "data", "tasks.json");

//Gettings all tasks
const getAllTasks = () => {
  const tasksData = fs.readFileSync(tasksPath, { encoding: "utf-8" });

  return JSON.parse(tasksData);
};

//Save all tasks
const saveTasks = tasks => {
  fs.writeFileSync(tasksPath, JSON.stringify(tasks));
};

//Creating a new task
const createTask = taskText => {
  const tasks = getAllTasks();
  const newTask = {
    id: uuid(),
    task: taskText,
    isFinished: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
};

//Finish task
const finishTask = taskId => {
  const tasks = getAllTasks();
  const task = tasks.find(task => task.id === taskId);

  if (!task) throw new Error("Task doesn't exist");

  task.isFinished = true;

  saveTasks(tasks);
};

//TODO Delete a task
const deleteTask = taskId => {};

module.exports = {
  getAllTasks,
  saveTasks,
  createTask,
  finishTask,
  deleteTask,
};

console.log("changed");
