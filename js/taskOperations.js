import { v4 as uuidv4 } from "uuid";
import {
  getTasksFromLocalStorage,
  setTasksFromLocalStorageAndRender,
} from "./storageUtils.js";
import { createDomElement } from "./utils.js";

export const addTasks = (task) => {
  const id = uuidv4();
  console.log(id);

  if (task.length < 3) {
    return;
  }
  let listTasks = getTasksFromLocalStorage();
  listTasks.push({
    description: task,
    completed: false,
    id: uuidv4(),
  });
  setTasksFromLocalStorageAndRender(listTasks);
};

export const deleteTask = (id) => {
  let listTasks = getTasksFromLocalStorage();
  const initialLength = listTasks.length;
  listTasks = listTasks.filter((task) => task.id !== id);

  if (initialLength !== listTasks.length) {
    setTasksFromLocalStorageAndRender(listTasks);
  }
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
  input.placeholder = "Длинна задачи должна быть больше 3 символов.";
  input.classList.add("invalid-value");
};

export const updateTaskDescription = (id, newDescription) => {
  let listTasks = getTasksFromLocalStorage();
  const taskIndex = listTasks.findIndex((item) => item.id === id);

  if (taskIndex !== -1) {
    listTasks[taskIndex].description = newDescription;
    setTasksFromLocalStorageAndRender(listTasks);
  }
};

export const enableTaskEditing = (element) => {
  const p = element;
  const originalText = p.textContent;

  const input = createDomElement("input", {
    classes: ["task-edit-input"],
    elementAttributes: {
      type: "text",
      value: originalText,
    },
  });

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
    if (e.key === "Enter") {
      input.removeEventListener("blur", finishEditing);
      finishEditing();
    }
  });
};

export const filterTasks = (listTasks, filterType) => {
  switch (filterType) {
    case "panding":
      return listTasks.filter((item) => !item.completed);
    case "completed":
      return listTasks.filter((item) => item.completed);
    case "all":
      return listTasks;
    default:
      return tasks.filter((task) =>
        task.description.toLowerCase().includes(filter.toLowerCase())
      );
  }
};

export const sortTasks = (listTasks, sortType) => {
  switch (sortType) {
    case "tasks-panding":
      return listTasks.slice().sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed - b.completed;
        } else {
          return 0;
        }
      });
    case "tasks-completed":
      return listTasks.slice().sort((a, b) => {
        if (a.completed !== b.completed) {
          return b.completed - a.completed;
        } else {
          return 0;
        }
      });
    default:
      return listTasks;
  }
};
