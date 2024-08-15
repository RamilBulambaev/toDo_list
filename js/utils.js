export const createElementAndAddClasses = (nameElement, arrClasses) => {
  const element = document.createElement(nameElement);
  arrClasses.forEach((item) => element.classList.add(item));
  return element;
};
