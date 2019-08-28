import removeMobileHover from "./utils/removeMobileHover.js";
import navImg from "./navImg.js";

removeMobileHover();
navImg();

document.querySelector("html").classList.add("js-is-loaded");
