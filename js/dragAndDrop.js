import { LIST } from "./domElements.js";
import { setTasksFromLocalStorageAndRender } from "./storageUtils.js";

export const dragAndDrop = () => {
  let draggedItem = null;

  LIST.addEventListener("dragstart", (e) => {
    draggedItem = e.target.closest("li");
    e.target.classList.add("dragging");
  });

  LIST.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
    draggedItem = null;
    saveNewOrder();
  });

  LIST.addEventListener("dragover", (e) => {
    e.preventDefault();
    const target = e.target.closest("li");

    if (target && target !== draggedItem) {
      const bounding = target.getBoundingClientRect();
      const offset = e.clientY - bounding.top;

      if (offset > bounding.height / 2) {
        target.after(draggedItem);
      } else {
        target.before(draggedItem);
      }
    }
  });
};

function saveNewOrder() {
  const listItems = [...LIST.querySelectorAll("li")];

  const newTasksOrder = listItems.map((item) => ({
    id: item.getAttribute("data-id"),
    description: item.querySelector(".list-item__description").textContent,
    completed: item.querySelector(".checkbox").checked,
  }));

  setTasksFromLocalStorageAndRender(newTasksOrder);
}
