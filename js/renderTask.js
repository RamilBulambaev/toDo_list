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

// import { createTask } from "./createTask.js";
// import { checkedTaskComplite } from "./taskOperations.js";
// import {
//   LIST,
//   LIST_NOT,
//   TASK_COMPLETED_COUNT,
//   TASK_PANDING_COUNT,
// } from "./domElements.js";
// import { getTasksFromLocalStorage } from "./storageUtils.js";

// export const renderTasks = (listTasks) => {
//   const existingTasks = LIST.querySelectorAll("li");
//   const taskInDom = Array.from(existingTasks).map((li) => ({
//     id: li.getAttribute("data-id"),
//     description: li.querySelector(".list-item__description").textContent,
//     completed: li.querySelector(".checkbox").checked,
//   }));

//   const removedTasks = taskInDom.filter(
//     (task) => !listTasks.find((t) => t.id == task.id)
//   );

//   const newOrUpadtedTasks = listTasks.filter((task) => {
//     const existingTask = taskInDom.find((t) => t.id == task.id);
//     return (
//       !existingTask ||
//       existingTask.description !== task.description ||
//       existingTask.completed !== task.completed
//     );
//   });

//   removedTasks.forEach((task) => {
//     const li = LIST.querySelector(`li[data-id="${task.id}"]`);
//     if (li) {
//       LIST.removeChild(li);
//     }
//   });

//   newOrUpadtedTasks.forEach((task) => {
//     let li = LIST.querySelector(`li[data-id="${task.id}"]`);
//     if (li) {
//       li.querySelector(".list-item__description").textContent =
//         task.description;
//       li.querySelector(".checkbox").checked = task.completed;
//     } else {
//       li = createTask(task);
//       LIST.appendChild(li);
//     }
//   });

//   const numberOfCompletedTask = checkedTaskComplite(listTasks);
//   const numberOfTasks = listTasks.length;
//   TASK_COMPLETED_COUNT.innerHTML = `${numberOfCompletedTask}/${numberOfTasks}`;
//   TASK_PANDING_COUNT.innerHTML = `${
//     numberOfTasks - numberOfCompletedTask
//   }/${numberOfTasks}`;

//   visibleTasks();
// };

// const visibleTasks = () => {
//   let listTasks = getTasksFromLocalStorage();

//   if (listTasks.length > 0) {
//     LIST_NOT.classList.add("hidden");
//     LIST.classList.remove("hidden");
//   } else {
//     LIST_NOT.classList.remove("hidden");
//     LIST.classList.add("hidden");
//   }
// };
