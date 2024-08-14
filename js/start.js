import { renderTasks } from "./renderTask.js";
import {
  handleClickTask,
  handleFormSubmit,
  handleChangeFilter,
  handleSort,
} from "./handlers.js";
import { getTasksFromLocalStorage } from "./storageUtils.js";
import { LIST } from "./domElements.js";

export const start = () => {
  LIST.innerHTML = "";
  if (window.localStorage.getItem("tasks")) {
    renderTasks(getTasksFromLocalStorage());
  }

  handleFormSubmit();
  handleClickTask();
  handleChangeFilter();
  handleSort();
};
