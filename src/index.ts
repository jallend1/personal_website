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
      elementDimensions.textContent = `width: ${width}px, height: ${height}px`;
    }
    const elementText: HTMLElement | null =
      document.querySelector("#element-text");
    if (elementText)
      elementText.textContent = el.textContent
        ? el.textContent.length.toString()
        : "0";
    const parentNode: HTMLElement | null =
      document.querySelector("#element-parent");
    if (parentNode) parentNode.textContent = el.parentElement?.tagName ?? "";
    const childNodes: HTMLElement | null =
      document.querySelector("#element-children");
    if (childNodes) {
      childNodes.innerHTML = "";
      for (let i = 0; i < el.childNodes.length; i++) {
        const child = el.childNodes[i];
        const childEl = document.createElement("li");
        childEl.textContent = `${child.nodeName}`;
        childNodes.appendChild(childEl);
      }
    }
    const siblingNodes: HTMLElement | null =
      document.querySelector("#element-siblings");
    if (siblingNodes) {
      siblingNodes.innerHTML = "";
      const siblings = el.parentElement?.children;
      if (siblings) {
        // Excludes the current element from the sibling list
        const filteredSiblings = Array.from(siblings).filter(
          (sibling) => sibling !== el
        );
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
    const elementName: HTMLElement | null =
      document.querySelector("#element-name");
    if (elementName) elementName.textContent = "";
  });
});
