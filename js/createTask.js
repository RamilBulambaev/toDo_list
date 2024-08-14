export const createTask = (task) => {
  const li = createElementAndAddClasses("li", ["list__item", "list-item"]);
  li.setAttribute("data-id", task.id);

  const label = createElementAndAddClasses("label", ["custom-checkbox"]);

  const checkbox = createElementAndAddClasses("input", ["checkbox"]);
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  const span = createElementAndAddClasses("span", ["custom-checkbox__box"]);

  label.append(checkbox, span);

  const p = document.createElement("p");
  p.textContent = task.description.trim();
  if (task.completed) {
    p.classList.add("task-complete");
  }

  const imgDelete = createElementAndAddClasses("img", ["delete"]);
  imgDelete.src = "../assets/delete.svg";

  li.append(label, p, imgDelete);

  return li;
};

const createElementAndAddClasses = (nameElement, arrClasses) => {
  const element = document.createElement(nameElement);
  arrClasses.forEach((item) => element.classList.add(item));
  return element;
};
