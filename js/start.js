import { renderTasks } from "./renderTask.js";
import {
  handleClickTask,
  handleFormSubmit,
  handleChangeFilter,
  handleSort,
} from "./handlers.js";
import { getTasksFromLocalStorage } from "./storageUtils.js";
import { LIST } from "./domElements.js";
import { dragAndDrop } from "./dragAndDrop.js";

export const start = () => {
  LIST.innerHTML = "";
  if (window.localStorage.getItem("tasks")) {
    renderTasks(getTasksFromLocalStorage());
  }

  handleFormSubmit();
  handleClickTask();
  handleChangeFilter();
  handleSort();
  dragAndDrop();
};
