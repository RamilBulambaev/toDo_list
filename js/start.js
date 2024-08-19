import { renderTasks } from "./renderTask.js";
import {
  handleClickTask,
  handleFormSubmit,
  handleChangeFilter,
  handleSort,
  handleThemeSwitcher,
} from "./handlers.js";
import { getTasksFromLocalStorage } from "./storageUtils.js";
import {
  CHECKBOX_SWITCHER_THEME,
  LIST,
  ADD_FORM,
  SORT_DIV,
  FILTER_TASK,
} from "./domElements.js";
import { dragAndDrop } from "./dragAndDrop.js";
import { themeSwitcher } from "./themeSwitcher.js";

export const start = () => {
  LIST.innerHTML = "";
  if (window.localStorage.getItem("tasks")) {
    renderTasks(getTasksFromLocalStorage());
  }

  if (localStorage.getItem("styleMode") === "darkStyle") {
    themeSwitcher(true);
  }
  if (localStorage.getItem("styleMode") === "lightStyle") {
    CHECKBOX_SWITCHER_THEME.checked = false;
    themeSwitcher(false);
  }

  handleFormSubmit(ADD_FORM);
  handleClickTask(LIST);
  handleChangeFilter(FILTER_TASK);
  handleSort(SORT_DIV, FILTER_TASK);
  handleThemeSwitcher(CHECKBOX_SWITCHER_THEME);
  dragAndDrop();
};
