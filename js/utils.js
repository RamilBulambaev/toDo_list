export const createDomElement = (
  tagName,
  { classes = [], elementAttributes = {}, elementText = "" } = {}
) => {
  const element = document.createElement(tagName);

  classes.forEach((className) => element.classList.add(className));

  Object.entries(elementAttributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (elementText) {
    element.textContent = elementText;
  }
  return element;
};
