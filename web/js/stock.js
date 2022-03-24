import { elementMaker, TreeNode, childArray, makeNodeTree } from './utilities.js';

/**
  * Function create Tree structure for a stock row fetched from database.
  */
function makeStockRow () {
  // Construct root level DOM Element as TreeNode object
  const stockRow = new TreeNode(elementMaker('tr'));

  // Populate children attribute of stockRow with TreeNode type objects
  stockRow.children = childArray(
    { elem: 'th', content: '1' },
    { elem: 'td', content: 'RHS' },
    { elem: 'td' },
    { elem: 'td' },
    { elem: 'td' },
    { elem: 'td' }
  );
  stockRow.children[2].children = childArray(
    {
      elem: 'input',
      classList: ['form-control', 'form-control-sm'],
      attribs: { type: 'number', disabled: 'true' }
    }
  );
  stockRow.children[3].children = childArray(
    { elem: 'div', classList: ['input-group', 'input-group-sm'] }
  );
  stockRow.children[3].children[0].children = childArray(
    {
      elem: 'input',
      classList: ['form-control'],
      attribs: { type: 'text', disabled: 'true' }
    },
    {
      elem: 'select',
      classList: ['form-control', 'form-control-sm']
    }
  );
  stockRow.children[3].children[0].children[1].children = childArray(
    {
      elem: 'option',
      content: 'cm',
      attribs: {
        selected: true,
        value: 'cm'
      }
    },
    { elem: 'option', content: 'mm', attribs: { value: 'mm' } },
    { elem: 'option', content: 'm', attribs: { value: 'm' } }
  );
  stockRow.children[4].children = childArray(
    { elem: 'div', classList: ['input-group', 'input-group-sm'] }
  );
  stockRow.children[4].children[0].children = childArray(
    {
      elem: 'input',
      classList: ['form-control'],
      attribs: { type: 'text', disabled: 'true' }
    },
    {
      elem: 'select',
      classList: ['form-control', 'form-control-sm']
    }
  );
  stockRow.children[4].children[0].children[1].children = childArray(
    {
      elem: 'option',
      content: 'ETB',
      attribs: {
        selected: true,
        value: 'ETB'
      }
    },
    { elem: 'option', content: '€', attribs: { value: '€' } },
    { elem: 'option', content: '$', attribs: { value: '$' } }
  );
  stockRow.children[5].children = childArray(
    { elem: 'div', classList: ['btn-group', 'btn-group-sm'] }
  );
  stockRow.children[5].children[0].children = childArray(
    { elem: 'button', classList: ['btn', 'btn-primary'] },
    { elem: 'button', classList: ['btn', 'btn-warning'] },
    {
      elem: 'button',
      classList: ['btn', 'btn-danger'],
      attribs: { id: 'deleteBtn' }
    }
  );
  stockRow.children[5].children[0].children[0].children = childArray(
    { elem: 'i', classList: ['fas', 'fa-edit', 'fa-sm'] }
  );
  stockRow.children[5].children[0].children[1].children = childArray(
    { elem: 'i', classList: ['fas', 'fa-save', 'fa-sm'] }
  );
  stockRow.children[5].children[0].children[2].children = childArray(
    { elem: 'i', classList: ['fas', 'fa-trash-alt', 'fa-sm'] }
  );
  stockRow
    .children[5]
    .children[0]
    .children[2]
    .element.addEventListener('click', (e) => {
      e
        .currentTarget
        .parentNode
        .parentNode
        .parentNode
        .remove();
    });
  return stockRow;
}

/* Handle the click event on the button located below stock table */
const addStockRow = document.getElementById('addStockRow');
addStockRow.addEventListener('click', () => {
  console.log(makeNodeTree(makeStockRow()).element);
  const stockTable = document.getElementById('stockTable');
  stockTable.append(makeNodeTree(makeStockRow()).element);
});
