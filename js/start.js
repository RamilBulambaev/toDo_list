import { renderTasks } from "./renderTask.js";
import {
  handleClickTask,
  handleFormSubmit,
  handleChangeFilter,
  handleSort,
} from "./handlers.js";
import { LIST } from "./domElements.js";

export const getTasksFromLocalStorage = () =>
  JSON.parse(window.localStorage.getItem("tasks")) || [];

// export let listTasks = [];
export const localStorage = window.localStorage;

export const start = () => {
  LIST.innerHTML = "";
  if (localStorage.getItem("tasks")) {
    // listTasks = JSON.parse(localStorage.getItem("tasks"));
    // renderTasks(listTasks);
    renderTasks(getTasksFromLocalStorage());
  }

  handleFormSubmit();
  handleClickTask();
  handleChangeFilter();
  handleSort();
};
