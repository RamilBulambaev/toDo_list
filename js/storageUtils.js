import { renderTasks } from "./renderTask.js";

export const getTasksFromLocalStorage = () =>
  JSON.parse(window.localStorage.getItem("tasks")) || [];

export const setTasksFromLocalStorageAndRender = (listTasks) => {
  window.localStorage.setItem("tasks", JSON.stringify(listTasks));
  renderTasks(listTasks);
};
