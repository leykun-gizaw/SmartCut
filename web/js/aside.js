import { elementMaker, TreeNode } from './utilities.js';

function makeProjectCard (project, customer, began, ends) {
  const projectCard = new TreeNode(elementMaker('button'));
  projectCard.element.classList.add(...['list-group-item', 'list-group-item-action']);
  projectCard.children = childArray(
    { elem: 'div', classList: ['d-flex', 'w-100', 'justify-content-between'], content: '' },
    { elem: 'h6', classList: ['mb-1'], content: `CUSTOMER: ${customer}` },
    { elem: 'hr', classList: [], content: '' },
    { elem: 'p', classList: ['mb-1'], content: 'Small Placeholder in a paragraph' },
    { elem: 'div', classList: ['row', 'gx-3'], content: '' }
  );
  projectCard.children[0].children = childArray(
    { elem: 'h5', classList: ['mb-1'], content: project },
    { elem: 'span', classList: ['badge', 'bg-success'], content: 'on going' }
  );
  projectCard.children[4].children = childArray(
    { elem: 'div', classList: ['col'], content: '' },
    { elem: 'div', classList: ['col'], content: '' }
  );
  projectCard.children[4].children[0].children = childArray(
    { elem: 'div', classList: ['col', 'border', 'rounded-3', 'fs-6', 'fw-light'], content: '' }
  );
  projectCard.children[4].children[1].children = childArray(
    { elem: 'div', classList: ['col', 'border', 'rounded-3', 'fs-6', 'fw-light'], content: '' }
  );
  projectCard.children[4].children[0].children[0].children = childArray(
    { elem: 'small', classList: [], content: `Start: ${began}` }
  );
  projectCard.children[4].children[1].children[0].children = childArray(
    { elem: 'small', classList: [], content: `End: ${ends}` }
  );
  return projectCard;
}

function childArray (...arr) {
  const children = [];
  for (let i = 0; i < arr.length; i++) {
    const element = new TreeNode(elementMaker(arr[i].elem));
    if (arr[i].classList !== []) element.element.classList.add(...arr[i].classList);
    if (arr[i].content !== '') element.element.innerText = arr[i].content;
    children.push(element);
  }
  return children;
}

function makeProjectCardTree (card) {
  if (card.children.length !== 0) {
    for (let i = 0; i < card.children.length; i++) {
      card.element.append(makeProjectCardTree(card.children[i]).element);
    }
  }
  return card;
}

export { makeProjectCardTree, makeProjectCard };
