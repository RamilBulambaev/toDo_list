import { renderTasks } from "./renderTask.js";
import {
  addTasks,
  deleteTask,
  toggleCompletedTask,
  invalidFieldWarningInput,
  enableTaskEditing,
  sortTasks,
  filterTasks,
} from "./taskOperations.js";
import { getTasksFromLocalStorage } from "./storageUtils.js";
import { themeSwitcher } from "./themeSwitcher.js";

export const handleFormSubmit = (elment) => {
  elment.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target[0];
    const taskDescription = input.value.trim();

    if (taskDescription.length >= 3) {
      try {
        addTasks(taskDescription);
        input.value = "";
      } catch (error) {
        console.error("Error adding task:", error);
        alert("Произошла ошибка при добавлении задачи. Попробуйте снова.");
      }
    } else {
      invalidFieldWarningInput(e.target[0]);
    }
  });
  elment.addEventListener("focusin", (e) => {
    const input = e.target;
    input.classList.remove("invalid-value");
    input.placeholder = "Создать новую задачу";
  });
};

export const handleClickTask = (elment) => {
  elment.addEventListener("click", (e) => {
    try {
      if (e.target.classList.contains("delete")) {
        deleteTask(e.target.parentElement.dataset.id);
      }
      if (e.target.classList.contains("checkbox")) {
        toggleCompletedTask(e.target.closest("li").dataset.id);
      }
      if (
        e.target.classList.contains("list-item__description") &&
        !e.target.classList.contains("task-complete")
      ) {
        enableTaskEditing(e.target);
      }
    } catch (error) {
      console.error("Error handling task click:", error);
      alert("Произошла ошибка при обработке задачи. Попробуйте снова.");
    }
  });
};

export const handleSort = (elmentSort, elementFilter) => {
  elmentSort.addEventListener("click", (e) => {
    let listTasks = getTasksFromLocalStorage();
    if (
      e.target.classList.contains("tasks-panding") ||
      e.target.classList.contains("tasks-completed")
    ) {
      listTasks = sortTasks(listTasks, e.target.classList[1]);
      elementFilter.value = "title";
      renderTasks(listTasks);
    }
  });
};

export const handleChangeFilter = (elementFilter) => {
  elementFilter.addEventListener("change", (e) => {
    let listTasks = getTasksFromLocalStorage();
    listTasks = filterTasks(listTasks, e.target.value);
    renderTasks(listTasks);
  });
};

export const handleThemeSwitcher = (elementSwither) => {
  elementSwither.addEventListener("change", (e) => {
    themeSwitcher(e.target.checked);
  });
};
