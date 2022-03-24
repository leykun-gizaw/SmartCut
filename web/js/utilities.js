/**
  * aside module.
  * @module js/utilities.js
  */

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

/**
  * Return a childrens array according to provided objects array.
  * @param {Array} ...arr Spreaded arguments array
  * @returns {Array} Array of children where each element is typeof TreeNode
  */
function childArray (...arr) {
  // Define chidren array to hold all children objects
  const children = [];
  /**
    * For each object in ...arr, construct TreeNode object with their element
    * attributes given a class list and inner text and when finished appended
    * to children array.
    */
  for (let i = 0; i < arr.length; i++) {
    const obj = new TreeNode(elementMaker(arr[i].elem));
    if (arr[i].classList !== []) obj.element.classList.add(...arr[i].classList);
    if (arr[i].content !== '') obj.element.innerText = arr[i].content;
    children.push(obj);
  }
  // Return children array
  return children;
}

function elementMaker (elem) {
  return document.createElement(elem);
}
export { elementMaker, TreeNode, childArray };
