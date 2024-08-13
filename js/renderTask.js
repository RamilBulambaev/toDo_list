import { checkedTaskComplite, visibleTasks, createTask } from "./createTask.js";
import {
  LIST,
  TASK_COMPLETED_COUNT,
  TASK_PANDING_COUNT,
} from "./domElements.js";

export const renderTasks = (listTasks) => {
  const numberOfCompletedTask = checkedTaskComplite();
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
