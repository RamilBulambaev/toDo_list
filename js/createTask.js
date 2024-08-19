import { createDomElement } from "./utils.js";

export const createTask = (task) => {
  const li = createDomElement("li", {
    classes: ["list__item", "list-item"],
    elementAttributes: {
      "data-id": task.id,
      draggable: true,
    },
  });

  const label = createDomElement("label", {
    classes: ["custom-checkbox"],
  });

  const checkbox = createDomElement("input", {
    classes: ["checkbox"],
    elementAttributes: {
      type: "checkbox",
    },
  });
  checkbox.checked = task.completed;

  const span = createDomElement("span", {
    classes: ["custom-checkbox__box"],
  });

  label.append(checkbox, span);

  const p = createDomElement("p", {
    classes: ["list-item__description"],
    elementText: task.description.trim(),
  });
  if (task.completed) {
    p.classList.add("task-complete");
  }

  const imgDelete = createDomElement("img", {
    classes: ["delete"],
    elementAttributes: {
      src: "../assets/delete.svg",
    },
  });

  li.append(label, p, imgDelete);

  return li;
};
