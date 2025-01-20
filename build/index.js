"use strict";
const resetElements = () => {
    const elementIds = [
        "element-name",
        "element-attributes",
        "element-dimensions",
        "element-text",
        "element-grandparent",
        "element-parent",
        "element-children",
        "element-siblings",
    ];
    elementIds.forEach((id) => {
        const element = document.querySelector(`#${id}`);
        if (element)
            element.textContent = "";
    });
};
const setTextContent = (id, text) => {
    const element = document.querySelector(`#${id}`);
    if (element)
        element.textContent = text;
};
const populateAttributesList = (id, attributes) => {
    const element = document.querySelector(`#${id}`);
    if (element) {
        element.innerHTML = "";
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            const attrEl = document.createElement("li");
            attrEl.innerHTML = `<span class="attr-name">${attr.name}</span>: <span class="attr-value">${attr.value}</span>`;
            element.appendChild(attrEl);
        }
    }
};
const populateChildNodes = (id, children) => {
    const element = document.querySelector(`#${id}`);
    if (element && children.length > 0) {
        element.innerHTML = "";
        const filteredChildren = Array.from(children).filter((child) => child.nodeName !== "#text");
        if (filteredChildren.length === 0) {
            const noChildren = document.createElement("li");
            noChildren.textContent = "None";
            element.appendChild(noChildren);
        }
        else {
            const childrenCount = filteredChildren.reduce((acc, child) => {
                acc[child.nodeName] = acc[child.nodeName]
                    ? acc[child.nodeName] + 1
                    : 1;
                return acc;
            }, {});
            for (let key in childrenCount) {
                const childCountEl = document.createElement("li");
                childCountEl.textContent = `${key}: ${childrenCount[key]}`;
                element.appendChild(childCountEl);
            }
        }
    }
};
const populateSiblingNodes = (id, siblings) => {
    const element = document.querySelector(`#${id}`);
    if (element) {
        element.innerHTML = "";
        if (!siblings)
            return;
        const filteredSiblings = Array.from(siblings).filter((sibling) => sibling.nodeName !== "#text");
        if (filteredSiblings.length === 0) {
            const noSiblings = document.createElement("li");
            noSiblings.textContent = "None";
            element.appendChild(noSiblings);
        }
        else {
            const siblingCount = filteredSiblings.reduce((acc, sibling) => {
                acc[sibling.nodeName] = acc[sibling.nodeName]
                    ? acc[sibling.nodeName] + 1
                    : 1;
                return acc;
            }, {});
            for (let key in siblingCount) {
                const siblingCountEl = document.createElement("li");
                siblingCountEl.textContent = `${key}: ${siblingCount[key]}`;
                element.appendChild(siblingCountEl);
            }
        }
    }
};
const updateElements = (el) => {
    var _a, _b, _c, _d, _e, _f, _g;
    el.classList.add("border-overlay");
    setTextContent("element-name", el.tagName);
    setTextContent("element-grandparent", (_c = (_b = (_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.tagName) !== null && _c !== void 0 ? _c : "");
    setTextContent("element-parent", (_e = (_d = el.parentElement) === null || _d === void 0 ? void 0 : _d.tagName) !== null && _e !== void 0 ? _e : "");
    setTextContent("element-text", el.textContent ? el.textContent.length.toString() : "0");
    const { width, height } = el.getBoundingClientRect();
    setTextContent("element-dimensions", `width: ${Math.floor(width)}px, height: ${Math.floor(height)}px`);
    populateAttributesList("element-attributes", el.attributes);
    populateChildNodes("element-children", el.childNodes);
    populateSiblingNodes("element-siblings", (_g = (_f = el.parentElement) === null || _f === void 0 ? void 0 : _f.children) !== null && _g !== void 0 ? _g : null);
};
const addEventListeners = () => {
    const elements = document.querySelectorAll("section, img, a, p, h1, h2, h3, h4, code, div, span, ul, li, hr, footer, header");
    elements.forEach((el) => {
        el.addEventListener("mouseover", (e) => {
            e.stopPropagation();
            // Don't highlight elements inside the asides or the container element
            if (el.closest("aside") || el.classList.contains("container"))
                return;
            updateElements(el);
        });
        el.addEventListener("mouseout", () => {
            el.classList.remove("border-overlay");
            resetElements();
        });
    });
};
addEventListeners();
