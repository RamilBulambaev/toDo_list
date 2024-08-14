import { renderTasks } from "./renderTask.js";
import {
  addTasks,
  deleteTask,
  toggleCompletedTask,
  invalidFieldWarningInput,
} from "./taskOperations.js";
import { ADD_FORM, LIST, SORT__DIV, FILTER_TASK } from "./domElements.js";
import { getTasksFromLocalStorage } from "./storageUtils.js";

export const handleFormSubmit = () => {
  ADD_FORM.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.target[0].value) {
      addTasks(e.target[0].value);
      e.target[0].value = "";
    } else {
      invalidFieldWarningInput(e.target[0]);
    }
  });
  ADD_FORM.addEventListener("focusin", (e) => {
    const input = e.target;
    input.classList.remove("invalid-value");
    input.placeholder = "Создать новую задачу";
  });
};

export const handleClickTask = () => {
  LIST.addEventListener("click", (e) => {
    if (e.target.classList.value === "delete") {
      deleteTask(e.target.parentElement.dataset.id);
    }
    if (e.target.classList.value === "checkbox") {
      toggleCompletedTask(e.target.closest("li").dataset.id);
    }
  });
};

export const handleSort = () => {
  SORT__DIV.addEventListener("click", (e) => {
    let listTasks = getTasksFromLocalStorage();
    if (e.target.classList.value === "tasks-summary__panding tasks-panding") {
      listTasks.sort((a, b) => {
        if (a.completed === false && b.completed === true) return -1;
        if (a.completed === true && b.completed === false) return 1;
        return 0;
      });
      FILTER_TASK.value = "title";
      renderTasks(listTasks);
    } else if (
      e.target.classList.value === "tasks-summary__completed tasks-completed"
    ) {
      listTasks.sort((a, b) => {
        if (a.completed === false && b.completed === true) return 1;
        if (a.completed === true && b.completed === false) return -1;
        return 0;
      });
      FILTER_TASK.value = "title";
      renderTasks(listTasks);
    }
  });
};

export const handleChangeFilter = () => {
  FILTER_TASK.addEventListener("change", (e) => {
    let listTasks = getTasksFromLocalStorage();
    const valueFilter = e.target.value;
    if (valueFilter === "panding") {
      listTasks = listTasks.filter((item) => item.completed === false);
      renderTasks(listTasks);
    } else if (valueFilter === "completed") {
      listTasks = listTasks.filter((item) => item.completed === true);
      renderTasks(listTasks);
    } else {
      listTasks = getTasksFromLocalStorage();
      renderTasks(listTasks);
    }
  });
};
