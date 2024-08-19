import { renderTasks } from "./renderTask.js";

export const getTasksFromLocalStorage = () => {
  try {
    return JSON.parse(window.localStorage.getItem("tasks")) || [];
  } catch (error) {
    console.error("Error retrieving tasks from localStorage:", error);
    alert("Не удалось загрузить задачи из локального хранилища.");
    return [];
  }
};

export const setTasksFromLocalStorageAndRender = (listTasks) => {
  try {
    window.localStorage.setItem("tasks", JSON.stringify(listTasks));
    renderTasks(listTasks);
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
    alert("Не удалось сохранить задачи в локальное хранилище.");
  }
};
