/**
  * aside module.
  * @module js/utilities.js
  */

/**
  * elementMaker - Function creates an element by the provided name
  * @param {string} elem Name of element required to create
  * @returns HTMLElememnt
  */
function elmMake (tag, attributes = {}) {
  const element = document.createElement(tag);

  /* Fastest way to check if object is empty or not is to use a for-in loop
    * in which I can write code block which will execute if object isn't empty.
    */
  for (const unneeded in attributes) { // eslint-disable-line no-unused-vars
    if (attributes.clsLst) {
      for (let i = 0; i < attributes.clsLst.length; i++) {
        element.classList.add(attributes.clsLst[i]);
      }
    }
    for (const prop in attributes.attribs) {
      element.setAttribute(prop, attributes.attribs[prop]);
    }
    if (attributes.cont) element.innerText = attributes.cont;
  }
  return element;
}

/**
  * appendToParent - Function appends HTMLElements to provided parent
  * @param {string} parent Required parent Element
  * @param {array} children Array of children HTML names
  * @returns {HTMLElement} parent Node
  */
function appendToParent (parent, children = []) {
  for (let i = 0; i < children.length; i++) {
    parent.append(children[i]);
  }
  return parent;
}

export { elmMake, appendToParent };
