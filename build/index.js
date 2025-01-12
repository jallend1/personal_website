"use strict";
const elements = document.querySelectorAll("section, img, a, p, h1, h2, h3, h4, code, aside, div, span, ul, li, hr, footer, header");
elements.forEach((el) => {
    el.addEventListener("mouseover", (e) => {
        e.stopPropagation();
        el.classList.add("active-element");
        const elementName = document.querySelector("#element-name");
        if (elementName)
            elementName.textContent = el.tagName;
    });
    el.addEventListener("mouseout", () => {
        el.classList.remove("active-element");
        const elementName = document.querySelector("#element-name");
        if (elementName)
            elementName.textContent = "";
    });
});
