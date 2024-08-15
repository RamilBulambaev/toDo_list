import { createTask } from "./createTask.js";
import { checkedTaskComplite } from "./taskOperations.js";
import {
  LIST,
  LIST_NOT,
  TASK_COMPLETED_COUNT,
  TASK_PANDING_COUNT,
} from "./domElements.js";
import { getTasksFromLocalStorage } from "./storageUtils.js";

export const renderTasks = (listTasks) => {
  const numberOfCompletedTask = checkedTaskComplite(listTasks);
  const numberOfTasks = listTasks.length;
  visibleTasks();
  LIST.innerHTML = "";
  listTasks.forEach((task) => {
    LIST.appendChild(createTask(task));
  });
  TASK_COMPLETED_COUNT.innerHTML = `${numberOfCompletedTask}/${numberOfTasks}`;
  TASK_PANDING_COUNT.innerHTML = `${
    numberOfTasks - numberOfCompletedTask
  }/${numberOfTasks}`;
};

const visibleTasks = () => {
  let listTasks = getTasksFromLocalStorage();

  if (listTasks.length > 0) {
    LIST_NOT.classList.add("hidden");
    LIST.classList.remove("hidden");
  } else {
    LIST_NOT.classList.remove("hidden");
    LIST.classList.add("hidden");
  }
};
