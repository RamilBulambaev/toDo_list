import { BODY_ELEMENT } from "./domElements.js";

const enableDarkStyle = () => {
  BODY_ELEMENT.classList.remove("lightstyle");
  localStorage.setItem("styleMode", "darkStyle");
};

const enableLightStyle = () => {
  BODY_ELEMENT.classList.add("lightstyle");
  localStorage.setItem("styleMode", "lightStyle");
};

export const themeSwitcher = (switcherState) => {
  if (switcherState) {
    enableDarkStyle();
  } else {
    enableLightStyle();
  }
};
