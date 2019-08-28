import { select, selectAll } from "./utils/dom.js";

const navLinks = selectAll("[data-nav-link]");
const navImgs = selectAll("[data-nav-img]");

const navHover = () => {
  navLinks.forEach(link => {
    const id = link.getAttribute("data-nav-link");
    const navImg = select(`[data-nav-img=${id}]`);

    link.addEventListener("mouseenter", () => {
      navImgs.forEach(img => {
        if (img.hasAttribute("style")) {img.removeAttribute("style");}
      });
      navImg.style.zIndex = "1000";
    });
  });
};

export default navHover;
