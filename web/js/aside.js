import { elementMaker, TreeNode, childArray } from './utilities.js';

/**
  * Function Creates Tree structure for projects fetched form database. Root
  * and successive children will be of type TreeNode. Constructed Tree is not
  * reusable but changeable to other layouts per user's need.
  * @param {string} project Name of project.
  * @param {string} customer Name of customer.
  * @param {Date} began Date project started.
  * @param {Date} ends Date project ended.
  * @returns TreeNode projectCard tree structure.
  */
function makeProjectCard (project, customer, began, ends) {
  // Construct root level DOM Element as TreeNode object
  const projectCard = new TreeNode(elementMaker('button'));

  // Assign required classes list to created element
  projectCard.element.classList.add(
    ...['list-group-item', 'list-group-item-action']
  );
  // Populate children attribute of projectCard with TreeNode type objects
  projectCard.children = childArray(
    {
      elem: 'div',
      classList: ['d-flex', 'w-100', 'justify-content-between']
    },
    { elem: 'h6', classList: ['mb-1'], content: `CUSTOMER: ${customer}` },
    { elem: 'hr' },
    {
      elem: 'p',
      classList: ['mb-1'],
      content: 'Small Placeholder in a paragraph'
    },
    { elem: 'div', classList: ['row', 'gx-3'] }
  );
  // Populate children of first child of projectCard
  projectCard.children[0].children = childArray(
    { elem: 'h5', classList: ['mb-1'], content: project },
    { elem: 'span', classList: ['badge', 'bg-success'], content: 'on going' }
  );
  // Populate children of last child of projectcard
  projectCard.children[4].children = childArray(
    { elem: 'div', classList: ['col'] },
    { elem: 'div', classList: ['col'] }
  );
  // Populate children of first child of last child of projectcard
  projectCard.children[4].children[0].children = childArray(
    {
      elem: 'div',
      classList: ['col', 'border', 'rounded-3', 'fs-6', 'fw-light']
    }
  );
  // Populate children of second child of last child of projectcard
  projectCard.children[4].children[1].children = childArray(
    {
      elem: 'div',
      classList: ['col', 'border', 'rounded-3', 'fs-6', 'fw-light']
    }
  );
  // Populate children of first child of first child last child of projectcard
  projectCard.children[4].children[0].children[0].children = childArray(
    { elem: 'small', content: `Start: ${began}` }
  );
  // Populate children of first child of second child last child of projectcard
  projectCard.children[4].children[1].children[0].children = childArray(
    { elem: 'small', content: `End: ${ends}` }
  );
  // Return projectCard tree structure
  return projectCard;
}

export { makeProjectCard };
