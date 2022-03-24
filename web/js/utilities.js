/**
  * aside module.
  * @module js/utilities.js
  */
function elementMaker (elem) {
  return document.createElement(elem);
}

/** Class representing a tree node */
class TreeNode {
  /**
    * Create a node object with element and children.
    * @property {HTMLElement} element: DOM Element represented by current
    * object.
    * @property {Array} children: Array of Child TreeNodes of the object.
    */
  constructor (element) {
    this.element = element;
    this.children = [];
  }
}

export { elementMaker, TreeNode };
