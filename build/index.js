"use strict";
const readyToGo = true;
console.log(readyToGo);
const el = document.getElementById("about");
if (el) {
    console.log(el);
}
else {
    console.error("Element with id 'about' not found.");
}
const sectionElements = document.querySelectorAll("section");
console.log(sectionElements);
console.dir(sectionElements[0]);
sectionElements.forEach((el) => {
    el.addEventListener("click", () => {
        console.log(`Clicked on ${el.id}`);
    });
    el.addEventListener("mouseover", () => {
        console.log(`Hovered over ${el.id}`);
        el.classList.add("active-element");
        console.log(`Height: ${el.clientHeight}`);
        console.log(`Width: ${el.clientWidth}`);
    });
    el.addEventListener("mouseout", () => {
        console.log(`Mouse out of ${el.id}`);
        el.classList.remove("active-element");
    });
});
