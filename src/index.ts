const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
  "section, img, a, p, h1, h2, h3, h4, code, div, span, ul, li, hr, footer, header"
);

elements.forEach((el: HTMLElement) => {
  el.addEventListener("mouseover", (e) => {
    e.stopPropagation();
    // Don't highlight elements inside the asides or the container element
    if (el.closest("aside") || el.classList.contains("container")) return;

    el.classList.add("active-element");
    // TODO: Refactor to use a single function to populate all elements
    const elementName: HTMLElement | null =
      document.querySelector("#element-name");
    if (elementName) elementName.textContent = el.tagName;
    const elementAttributes: HTMLElement | null = document.querySelector(
      "#element-attributes"
    );
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
    const elementDimensions: HTMLElement | null = document.querySelector(
      "#element-dimensions"
    );
    if (elementDimensions) {
      const { width, height } = el.getBoundingClientRect();
      elementDimensions.textContent = `width: ${Math.floor(
        width
      )}px, height: ${Math.floor(height)}px`;
    }
    const elementText: HTMLElement | null =
      document.querySelector("#element-text");
    if (elementText)
      elementText.textContent = el.textContent
        ? el.textContent.length.toString()
        : "0";
    const grandParentNode: HTMLElement | null = document.querySelector(
      "#element-grandparent"
    );
    if (grandParentNode)
      grandParentNode.textContent =
        el.parentElement?.parentElement?.tagName ?? "";
    const parentNode: HTMLElement | null =
      document.querySelector("#element-parent");
    if (parentNode) parentNode.textContent = el.parentElement?.tagName ?? "";
    const childNodes: HTMLElement | null =
      document.querySelector("#element-children");

    if (childNodes) {
      childNodes.innerHTML = "";
      const filteredChildren = Array.from(el.childNodes).filter(
        (child) => child.nodeName !== "#text"
      );
      if (filteredChildren.length === 0) {
        const noChildren = document.createElement("li");
        noChildren.textContent = "None";
        childNodes.appendChild(noChildren);
      } else {
        const childrenCount = filteredChildren.reduce(
          (acc: { [key: string]: number }, child) => {
            acc[child.nodeName] = acc[child.nodeName]
              ? acc[child.nodeName] + 1
              : 1;
            return acc;
          },
          {}
        );
        for (let key in childrenCount) {
          const childCountEl = document.createElement("li");
          childCountEl.textContent = `${key}: ${childrenCount[key]}`;
          childNodes.appendChild(childCountEl);
        }
      }
    }
    const siblingNodes: HTMLElement | null =
      document.querySelector("#element-siblings");
    if (siblingNodes) {
      siblingNodes.innerHTML = "";
      const siblings = el.parentElement?.children;
      if (siblings) {
        // Excludes the current element and #text from the sibling list
        const filteredSiblings = Array.from(siblings)
          .filter((sibling) => sibling !== el)
          .filter((sibling) => sibling.nodeName !== "#text");
        // Compiles count of each sibling type
        const siblingCount = filteredSiblings.reduce(
          (acc: { [key: string]: number }, sibling) => {
            acc[sibling.nodeName] = acc[sibling.nodeName]
              ? acc[sibling.nodeName] + 1
              : 1;
            return acc;
          },
          {}
        );
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
    const elementName: HTMLElement | null =
      document.querySelector("#element-name");
    if (elementName) elementName.textContent = "";
  });
});
