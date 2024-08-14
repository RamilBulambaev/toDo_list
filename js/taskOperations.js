import {
  getTasksFromLocalStorage,
  setTasksFromLocalStorageAndRender,
} from "./storageUtils.js";

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

export const toggleCompletedTask = (id) => {
  let listTasks = getTasksFromLocalStorage();
  const taskIndex = listTasks.findIndex((item) => item.id === +id);

  if (taskIndex !== -1) {
    listTasks[taskIndex].completed = !listTasks[taskIndex].completed;
    setTasksFromLocalStorageAndRender(listTasks);
  }
};

export const invalidFieldWarningInput = (input) => {
  input.placeholder = "Поле ввода должно быть заполненно";
  input.classList.add("invalid-value");
};
