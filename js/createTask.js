import {
  ADD_FORM,
  LIST,
  LIST_NOT,
  TASK_PANDING_COUNT,
  TASK_COMPLETED_COUNT,
  FILTER_TASK,
} from "./domElements.js";

let listTasks = [];
const localStorage = window.localStorage;

const checkedTaskComplite = () => {
  const completedTast = listTasks.reduce((acc, item) => {
    if (item.completed) {
      acc += 1;
    }
    return acc;
  }, 0);
  return completedTast;
};

const addTasks = (task) => {
  listTasks.push({
    description: task,
    completed: false,
    id: Date.now(),
  });
  localStorage.setItem("tasks", JSON.stringify(listTasks));
  renderTasks();
};

const deleteTask = (id) => {
  listTasks = listTasks.filter((task) => task.id != id);
  localStorage.setItem("tasks", JSON.stringify(listTasks));
  renderTasks();
};

export const start = () => {
  LIST.innerHTML = "";
  if (localStorage.getItem("tasks")) {
    listTasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
  }
  handleFormSubmit();
  hadletClickTask();
  handlerChangeFilter();
};

const renderTasks = () => {
  const numberOfCompletedTask = checkedTaskComplite();
  const numberOfTasks = listTasks.length;
  visibleTasks();
  LIST.innerHTML = "";
  listTasks.forEach((task) => {
    LIST.appendChild(createTask(task));
  });
  TASK_COMPLETED_COUNT.innerHTML = `${numberOfCompletedTask}/${numberOfTasks}`;
  TASK_PANDING_COUNT.innerHTML = `${
    numberOfTasks - numberOfCompletedTask
  }/${numberOfTasks}`;
};

const createTask = (task) => {
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

const handleFormSubmit = () => {
  ADD_FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    addTasks(e.target[0].value);
    e.target[0].value = "";
  });
};

const toggleCompletedTask = (id) => {
  const task = listTasks.find((item) => item.id == id);
  if (task) {
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(listTasks));
    renderTasks();
  }
};

const visibleTasks = () => {
  if (listTasks.length > 0) {
    LIST_NOT.classList.add("hidden");
    LIST.classList.remove("hidden");
  } else {
    LIST_NOT.classList.remove("hidden");
    LIST.classList.add("hidden");
  }
};

const hadletClickTask = () => {
  LIST.addEventListener("click", (e) => {
    if (e.target.classList.value === "delete") {
      deleteTask(e.target.parentElement.dataset.id);
    }
    if (e.target.classList.value === "checkbox") {
      toggleCompletedTask(e.target.closest("li").dataset.id);
    }
  });
};

const handlerChangeFilter = () => {
  FILTER_TASK.addEventListener("change", (e) => {
    const valueFilter = e.target.value;
    if (valueFilter === "panding") {
      listTasks = JSON.parse(localStorage.getItem("tasks"));
      listTasks = listTasks.filter((item) => item.completed === false);
      renderTasks();
    } else if (valueFilter === "completed") {
      listTasks = JSON.parse(localStorage.getItem("tasks"));
      listTasks = listTasks.filter((item) => item.completed === true);
      console.log(listTasks);
      renderTasks();
    } else {
      listTasks = JSON.parse(localStorage.getItem("tasks"));
      console.log(listTasks);
      renderTasks();
    }
  });
};
