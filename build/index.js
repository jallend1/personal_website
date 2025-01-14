"use strict";
const elements = document.querySelectorAll("section, img, a, p, h1, h2, h3, h4, code, div, span, ul, li, hr, footer, header");
elements.forEach((el) => {
    el.addEventListener("mouseover", (e) => {
        var _a, _b, _c;
        e.stopPropagation();
        // Don't highlight elements inside the asides or the container element
        if (el.closest("aside") || el.classList.contains("container"))
            return;
        el.classList.add("active-element");
        // TODO: Refactor to use a single function to populate all elements
        const elementName = document.querySelector("#element-name");
        if (elementName)
            elementName.textContent = el.tagName;
        const elementAttributes = document.querySelector("#element-attributes");
        if (elementAttributes) {
            elementAttributes.innerHTML = "";
            for (let i = 0; i < el.attributes.length; i++) {
                const attr = el.attributes[i];
                const attrEl = document.createElement("li");
                attrEl.innerHTML = `<span class="attr-name">${attr.name}</span>: <span class="attr-value">${attr.value}</span>`;
                elementAttributes.appendChild(attrEl);
            }
            console.log(el);
        }
        const elementDimensions = document.querySelector("#element-dimensions");
        if (elementDimensions) {
            const { width, height } = el.getBoundingClientRect();
            elementDimensions.textContent = `width: ${width}px, height: ${height}px`;
        }
        const elementText = document.querySelector("#element-text");
        if (elementText)
            elementText.textContent = el.textContent
                ? el.textContent.length.toString()
                : "0";
        const parentNode = document.querySelector("#element-parent");
        if (parentNode)
            parentNode.textContent = (_b = (_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.tagName) !== null && _b !== void 0 ? _b : "";
        const childNodes = document.querySelector("#element-children");
        if (childNodes) {
            childNodes.innerHTML = "";
            for (let i = 0; i < el.childNodes.length; i++) {
                const child = el.childNodes[i];
                const childEl = document.createElement("li");
                childEl.textContent = `${child.nodeName}`;
                childNodes.appendChild(childEl);
            }
        }
        const siblingNodes = document.querySelector("#element-siblings");
        if (siblingNodes) {
            siblingNodes.innerHTML = "";
            const siblings = (_c = el.parentElement) === null || _c === void 0 ? void 0 : _c.children;
            if (siblings) {
                // Excludes the current element from the sibling list
                const filteredSiblings = Array.from(siblings).filter((sibling) => sibling !== el);
                for (let i = 0; i < filteredSiblings.length; i++) {
                    const sibling = filteredSiblings[i];
                    const siblingEl = document.createElement("li");
                    siblingEl.textContent = `${sibling.nodeName}`;
                    siblingNodes.appendChild(siblingEl);
                }
            }
        }
    });
    el.addEventListener("mouseout", () => {
        el.classList.remove("active-element");
        // TODO: Refactor to use a single function to clear all elements
        const elementName = document.querySelector("#element-name");
        if (elementName)
            elementName.textContent = "";
    });
});
