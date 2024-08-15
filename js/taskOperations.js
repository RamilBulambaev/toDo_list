import {
  getTasksFromLocalStorage,
  setTasksFromLocalStorageAndRender,
} from "./storageUtils.js";
import { createElementAndAddClasses } from "./utils.js";

export const addTasks = (task) => {
  let listTasks = getTasksFromLocalStorage();
  listTasks.push({
    description: task,
    completed: false,
    id: Date.now(),
  });
  setTasksFromLocalStorageAndRender(listTasks);
};

export const deleteTask = (id) => {
  let listTasks = getTasksFromLocalStorage();
  listTasks = listTasks.filter((task) => task.id != id);
  setTasksFromLocalStorageAndRender(listTasks);
};

export const checkedTaskComplite = (tasksList) => {
  let listTasks = tasksList;
  const completedTast = listTasks.reduce((acc, item) => {
    if (item.completed) {
      acc += 1;
    }
    return acc;
  }, 0);
  return completedTast;
};

export const toggleCompletedTask = (id) => {
  let listTasks = getTasksFromLocalStorage();

  const taskIndex = listTasks.findIndex((item) => item.id === id);
  if (taskIndex !== -1) {
    listTasks[taskIndex].completed = !listTasks[taskIndex].completed;
    setTasksFromLocalStorageAndRender(listTasks);
  }
};

export const invalidFieldWarningInput = (input) => {
  input.placeholder = "Поле ввода должно быть заполненно";
  input.classList.add("invalid-value");
};

export const updateTaskDescription = (id, newDescription) => {
  let listTasks = getTasksFromLocalStorage();
  const taskIndex = listTasks.findIndex((item) => item.id === +id);

  if (taskIndex !== -1) {
    listTasks[taskIndex].description = newDescription;
    setTasksFromLocalStorageAndRender(listTasks);
  }
};

export const enableTaskEditing = (element) => {
  const p = element;
  const originalText = p.textContent;

  const input = createElementAndAddClasses("input", ["task-edit-input"]);
  input.type = "text";
  input.value = originalText;

  p.replaceWith(input);
  input.focus();

  const finishEditing = () => {
    const newText = input.value.trim();

    if (!newText) {
      p.textContent = originalText;
    } else if (newText !== originalText && newText.trim()) {
      const taskId = input.closest("li").dataset.id;
      updateTaskDescription(taskId, newText);
      p.textContent = newText;
    }

    if (input.isConnected) {
      input.replaceWith(p);
    }
  };

  input.addEventListener("blur", finishEditing);
  input.addEventListener("keypress", (e) => {
    input.removeEventListener("blur", finishEditing);
    if (e.key === "Enter") {
      finishEditing();
    }
  });
};
