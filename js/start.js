import { renderTasks } from "./renderTask.js";
import {
  hadletClickTask,
  handleFormSubmit,
  handlerChangeFilter,
  handleSort,
} from "./handlers.js";
import { LIST } from "./domElements.js";

export let listTasks = [];
export const localStorage = window.localStorage;

export const start = () => {
  LIST.innerHTML = "";
  if (localStorage.getItem("tasks")) {
    listTasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks(listTasks);
  }

  handleFormSubmit(listTasks);
  hadletClickTask();
  handlerChangeFilter(listTasks);
  handleSort(listTasks);
};
