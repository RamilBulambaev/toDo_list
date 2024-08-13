import { LIST, LIST_NOT } from "./domElements.js";
import { renderTasks } from "./renderTask.js";
import { localStorage, getTasksFromLocalStorage } from "./start.js";

export const checkedTaskComplite = () => {
  let listTasks = getTasksFromLocalStorage();
  const completedTast = listTasks.reduce((acc, item) => {
    if (item.completed) {
      acc += 1;
    }
    return acc;
  }, 0);
  return completedTast;
};

export const addTasks = (task) => {
  let listTasks = [];
  if (localStorage.getItem("tasks")) {
    listTasks = getTasksFromLocalStorage();
  }

  listTasks.push({
    description: task,
    completed: false,
    id: Date.now(),
  });
  localStorage.setItem("tasks", JSON.stringify(listTasks));
  renderTasks(listTasks);
};

export const deleteTask = (id) => {
  let listTasks = getTasksFromLocalStorage();
  listTasks = listTasks.filter((task) => task.id != id);
  localStorage.setItem("tasks", JSON.stringify(listTasks));
  renderTasks(listTasks);
};

export const createTask = (task) => {
  const li = document.createElement("li");
  li.classList.add("list__item", "list-item");
  li.setAttribute("data-id", task.id);
  const label = document.createElement("label");
  label.classList.add("custom-checkbox");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = task.completed;
  const span = document.createElement("span");
  span.classList.add("custom-checkbox__box");
  label.append(checkbox, span);
  const p = document.createElement("p");
  p.textContent = task.description;
  if (task.completed) {
    p.classList.add("task-complete");
  }
  const btnDelete = document.createElement("img");
  btnDelete.classList.add("delete");
  btnDelete.src = "../assets/delete.svg";
  li.append(label, p, btnDelete);
  return li;
};

export const toggleCompletedTask = (id) => {
  let listTasks = getTasksFromLocalStorage();
  const taskIndex = listTasks.findIndex((item) => item.id === +id);

  if (taskIndex !== -1) {
    listTasks[taskIndex].completed = !listTasks[taskIndex].completed;
    localStorage.setItem("tasks", JSON.stringify(listTasks));

    renderTasks(listTasks);
  }
};

export const visibleTasks = () => {
  let listTasks = getTasksFromLocalStorage();
  if (listTasks.length > 0) {
    LIST_NOT.classList.add("hidden");
    LIST.classList.remove("hidden");
  } else {
    LIST_NOT.classList.remove("hidden");
    LIST.classList.add("hidden");
  }
};
