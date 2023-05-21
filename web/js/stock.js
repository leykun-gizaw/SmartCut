import { elmMake, appendToParent } from './utilities.js';

/**
  * Function create Tree structure for a stock row fetched from database.
  */
function makeStockRow () {
  // Construct root level DOM Element as TreeNode object
  const stockTable = document.getElementById('stockTable');
  const stockRow = appendToParent(
    elmMake('tr'),
    [
      elmMake('th', { cont: `${stockTable.childElementCount + 1}` }),
      elmMake('td', { cont: 'RHS' }),
      appendToParent(
        elmMake('td'),
        [
          elmMake(
            'input',
            {
              clsLst: ['form-control', 'form-control-sm'],
              attribs: { type: 'number', disabled: true }
            }
          )
        ]
      ),
      appendToParent(
        elmMake('td'), [
          appendToParent(
            elmMake('div', { clsLst: ['input-group', 'input-group-sm'] }),
            [
              elmMake(
                'input', {
                  clsLst: ['form-control', 'form-control-sm'],
                  attribs: { type: 'text', disabled: true }
                }
              ),
              appendToParent(
                elmMake(
                  'select',
                  { clsLst: ['form-select', 'form-select-sm'] }
                ),
                [
                  elmMake('option', { attribs: { selected: true }, cont: 'cm' }),
                  elmMake('option', { cont: 'mm' }),
                  elmMake('option', { cont: 'm' })
                ]
              )
            ]
          )
        ]
      ),
      appendToParent(
        elmMake('td'), [
          appendToParent(
            elmMake('div', { clsLst: ['input-group', 'input-group-sm'] }),
            [
              elmMake(
                'input', {
                  clsLst: ['form-control', 'form-control-sm'],
                  attribs: { type: 'text', disabled: true }
                }
              ),
              appendToParent(
                elmMake(
                  'select',
                  { clsLst: ['form-select', 'form-select-sm'] }
                ),
                [
                  elmMake('option', { attribs: { selected: true }, cont: 'ETB' }),
                  elmMake('option', { cont: 'Euro' }),
                  elmMake('option', { cont: 'Pound' })
                ]
              )
            ]
          )
        ]
      ),
      appendToParent(
        elmMake('td'),
        [
          appendToParent(
            elmMake('div', { clsLst: ['btn-group', 'btn-group-sm'] }),
            [
              appendToParent(
                elmMake('button', { clsLst: ['btn', 'btn-primary'] }),
                [
                  elmMake('i', { clsLst: ['fas', 'fa-edit', 'fa-sm'] })
                ]
              ),
              appendToParent(
                elmMake('button', { clsLst: ['btn', 'btn-warning'] }),
                [
                  elmMake('i', { clsLst: ['fas', 'fa-save', 'fa-sm'] })
                ]
              ),
              appendToParent(
                elmMake('button', { clsLst: ['btn', 'btn-danger'] }),
                [
                  elmMake('i', { clsLst: ['fas', 'fa-trash', 'fa-sm'] })
                ]
              )
            ]
          )
        ]
      )
    ]
  );
  console.log(stockRow);
  stockRow
    .children[5]
    .children[0]
    .children[2]
    .addEventListener('click', (e) => {
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
  stockTable.append(makeStockRow());
});
