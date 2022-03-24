function elementMaker (elem) {
  return document.createElement(elem);
}

class TreeNode {
  constructor (element) {
    this.element = element;
    this.children = [];
  }
}

export { elementMaker, TreeNode };
