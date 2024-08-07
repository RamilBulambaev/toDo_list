import { ADD_FORM, LIST } from "./domElements.js";

const listTasks = [];
const tasksListDiv = [];

const addTask = () => {
  listTasks.map((task) => createTask(task.task));
  renderTasks();
};

const createTask = (textTask) => {
  const task = document.createElement("div");
  task.classList.add("task");
  task.innerText = textTask;
  return task;
};

const renderTasks = () => {
  LIST.innerHTML = "";
};

export const handleFormSubmit = () => {
  ADD_FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    listTasks.push({ task: e.target[0].value, isComplited: false });
    addTask();
    e.target[0].value = "";
  });
};
