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
    if (element) element.textContent = "";
  });
};

const tooltip = document.getElementById("tooltip") as HTMLElement;

const showTooltip = (el: HTMLElement, event: MouseEvent | TouchEvent) => {
  // tooltip.textContent = el.tagName;
  tooltip.innerHTML = `
    <span class="tooltip-tag">${el.tagName}</span>
    <span class="tooltip-dimensions">${Math.floor(
      el.getBoundingClientRect().width
    )}x${Math.floor(el.getBoundingClientRect().height)}</span>
    `;
  const rect = el.getBoundingClientRect();
  tooltip.style.left = `${rect.left + window.scrollX}px`;
  tooltip.style.top = `${rect.top + window.scrollY - 30}px`;
  tooltip.style.minWidth = `${rect.width}px`;
  tooltip.style.opacity = "0.9";
};

const hideTooltip = () => {
  tooltip.style.opacity = "0";
};

const setTextContent = (id: string, text: string) => {
  const element: HTMLElement | null = document.querySelector(`#${id}`);
  if (element) element.textContent = text;
};

const populateAttributesList = (id: string, attributes: NamedNodeMap) => {
  const element: HTMLElement | null = document.querySelector(`#${id}`);
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

const populateChildNodes = (id: string, children: NodeList) => {
  const element: HTMLElement | null = document.querySelector(`#${id}`);
  if (element && children.length > 0) {
    element.innerHTML = "";
    const filteredChildren = Array.from(children).filter(
      (child) => child.nodeName !== "#text"
    );
    if (filteredChildren.length === 0) {
      const noChildren = document.createElement("li");
      noChildren.textContent = "None";
      element.appendChild(noChildren);
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
        element.appendChild(childCountEl);
      }
    }
  }
};

const populateSiblingNodes = (id: string, siblings: HTMLCollection | null) => {
  const element: HTMLElement | null = document.querySelector(`#${id}`);
  if (element) {
    element.innerHTML = "";
    if (!siblings) return;
    const filteredSiblings = Array.from(siblings).filter(
      (sibling) => sibling.nodeName !== "#text"
    );
    if (filteredSiblings.length === 0) {
      const noSiblings = document.createElement("li");
      noSiblings.textContent = "None";
      element.appendChild(noSiblings);
    } else {
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
        element.appendChild(siblingCountEl);
      }
    }
  }
};

const updateElements = (el: HTMLElement) => {
  el.classList.add("border-overlay");
  setTextContent("element-name", el.tagName);
  setTextContent(
    "element-grandparent",
    el.parentElement?.parentElement?.tagName ?? ""
  );
  setTextContent("element-parent", el.parentElement?.tagName ?? "");
  setTextContent(
    "element-text",
    el.textContent ? el.textContent.length.toString() : "0"
  );
  const { width, height } = el.getBoundingClientRect();
  setTextContent(
    "element-dimensions",
    `width: ${Math.floor(width)}px, height: ${Math.floor(height)}px`
  );
  populateAttributesList("element-attributes", el.attributes);

  populateChildNodes("element-children", el.childNodes);

  populateSiblingNodes("element-siblings", el.parentElement?.children ?? null);
};

const addEventListeners = () => {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
    "section, img, a, p, h1, h2, h3, h4, code, div, span, ul, li, hr, footer, header"
  );
  elements.forEach((el: HTMLElement) => {
    el.addEventListener("mouseover", (e) => {
      e.stopPropagation();
      // Don't highlight elements inside the asides or the container element
      if (el.closest("aside") || el.classList.contains("container")) return;
      updateElements(el);
      showTooltip(el, e);
    });
    // Add touch event listener for mobile devices
    el.addEventListener("touchstart", (e) => {
      e.stopPropagation();
      // Don't highlight elements inside the asides or the container element
      if (el.closest("aside") || el.classList.contains("container")) return;
      updateElements(el);
      showTooltip(el, e);
    });
    el.addEventListener("mouseout", () => {
      el.classList.remove("border-overlay");
      resetElements();
      hideTooltip();
    });
    el.addEventListener("touchend", () => {
      el.classList.remove("border-overlay");
      resetElements();
      hideTooltip();
    });
  });
};

addEventListeners();
