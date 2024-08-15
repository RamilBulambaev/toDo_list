import { createElementAndAddClasses } from "./utils.js";

export const createTask = (task) => {
  const li = createElementAndAddClasses("li", ["list__item", "list-item"]);
  li.setAttribute("data-id", task.id);
  li.draggable = "true";

  const label = createElementAndAddClasses("label", ["custom-checkbox"]);

  const checkbox = createElementAndAddClasses("input", ["checkbox"]);
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  const span = createElementAndAddClasses("span", ["custom-checkbox__box"]);

  label.append(checkbox, span);

  const p = createElementAndAddClasses("p", ["list-item__description"]);
  p.textContent = task.description.trim();
  if (task.completed) {
    p.classList.add("task-complete");
  }

  const imgDelete = createElementAndAddClasses("img", ["delete"]);
  imgDelete.src = "../assets/delete.svg";

  li.append(label, p, imgDelete);

  return li;
};
