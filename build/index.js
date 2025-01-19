"use strict";
const elements = document.querySelectorAll("section, img, a, p, h1, h2, h3, h4, code, div, span, ul, li, hr, footer, header");
elements.forEach((el) => {
    el.addEventListener("mouseover", (e) => {
        var _a, _b, _c, _d, _e, _f;
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
            elementDimensions.textContent = `width: ${Math.floor(width)}px, height: ${Math.floor(height)}px`;
        }
        const elementText = document.querySelector("#element-text");
        if (elementText)
            elementText.textContent = el.textContent
                ? el.textContent.length.toString()
                : "0";
        const grandParentNode = document.querySelector("#element-grandparent");
        if (grandParentNode)
            grandParentNode.textContent =
                (_c = (_b = (_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.tagName) !== null && _c !== void 0 ? _c : "";
        const parentNode = document.querySelector("#element-parent");
        if (parentNode)
            parentNode.textContent = (_e = (_d = el.parentElement) === null || _d === void 0 ? void 0 : _d.tagName) !== null && _e !== void 0 ? _e : "";
        const childNodes = document.querySelector("#element-children");
        if (childNodes) {
            childNodes.innerHTML = "";
            const filteredChildren = Array.from(el.childNodes).filter((child) => child.nodeName !== "#text");
            if (filteredChildren.length === 0) {
                const noChildren = document.createElement("li");
                noChildren.textContent = "None";
                childNodes.appendChild(noChildren);
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
                    childNodes.appendChild(childCountEl);
                }
            }
        }
        const siblingNodes = document.querySelector("#element-siblings");
        if (siblingNodes) {
            siblingNodes.innerHTML = "";
            const siblings = (_f = el.parentElement) === null || _f === void 0 ? void 0 : _f.children;
            if (siblings) {
                // Excludes the current element and #text from the sibling list
                const filteredSiblings = Array.from(siblings)
                    .filter((sibling) => sibling !== el)
                    .filter((sibling) => sibling.nodeName !== "#text");
                // Compiles count of each sibling type
                const siblingCount = filteredSiblings.reduce((acc, sibling) => {
                    acc[sibling.nodeName] = acc[sibling.nodeName]
                        ? acc[sibling.nodeName] + 1
                        : 1;
                    return acc;
                }, {});
                for (let key in siblingCount) {
                    const siblingCountEl = document.createElement("li");
                    siblingCountEl.textContent = `${key}: ${siblingCount[key]}`;
                    siblingNodes.appendChild(siblingCountEl);
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
