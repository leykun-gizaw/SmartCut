import {
  makeResultTable,
  paginateResult,
  tabulateResult,
  layoutResult
} from './visualize.js';

/* Make tabs interactive and change display property of different sections */
['stockTab', 'cutlistTab', 'factorsTab', 'resultTab'].forEach(elem => {
  document.getElementById(elem).addEventListener('click', changeSection);
});

function changeSection (e) {
  const tabsUL = e.currentTarget.parentNode.parentNode;
  if (!e.currentTarget.classList.contains('active')) {
    for (let i = 0; i < tabsUL.childElementCount; i++) {
      if (tabsUL.children[i].children[0].classList.contains('active')) {
        tabsUL.children[i].children[0].classList.remove('active');
        tabsUL.children[i].children[0].classList.add('text-light');
      }
    }
    e.currentTarget.classList.add('active');
    const sec = document.getElementById('sections');
    if (e.currentTarget.innerText === 'Stock') {
      displaySingleGrid([sec.children[1], sec.children[2]], sec.children[0]);
    } else if (e.currentTarget.innerText === 'Cut List') {
      displaySingleGrid([sec.children[0], sec.children[2]], sec.children[1]);
    } else if (e.currentTarget.innerText === 'Result') {
      displaySingleGrid([sec.children[0], sec.children[1]], sec.children[2]);
    }
  }
}
function displaySingleGrid (noGrid, grid) {
  for (let i = 0; i < noGrid.length; i++) {
    noGrid[i].style.display = 'none';
  }
  grid.style.display = 'grid';
}

/* Cut List table adder function */
function addTableFunc () {
  const tableSection = document.getElementById('midSection');
  if (!tableSection.lastElementChild) {
    tableSection.innerHTML += `<div class="c1_r1"><button id="rem-CSV-table" class="btn btn-danger btn-sm hidden-table-delete"><i class="fas fa-plus"></i></button><table class="table table-sm table-hover table-bordered"><thead><tr><th colspan="3"><input type="text" placeholder="Steel Type"></th></tr></thead><tbody><tr><td>#</td><td>Quantity</td><td>Length(cm)</td></tr></tbody></table></div>`;
  } else {
    tableSection.lastElementChild.insertAdjacentHTML(
      'afterend',
      `<div class="c1_r1"><button id="rem-CSV-table" class="btn btn-danger btn-sm hidden-table-delete"><i class="fas fa-plus"></i></button><table class="table table-sm table-hover table-bordered"><thead><tr><th colspan="3"><input type="text" placeholder="Steel Type"></th></tr></thead><tbody><tr><td>#</td><td>Quantity</td><td>Length(cm)</td></tr></tbody></table></div>`
    );
  }
  for (let i = 0; i < tableSection.childElementCount; i++) {
    tableSection.children[i].firstElementChild.addEventListener('click', removeTable);
  }
  return tableSection.lastElementChild;
}
/* Remove Cut List table when X button is clicked */
function removeTable (e) {
  const prop = e.currentTarget.parentNode
    .lastElementChild.firstElementChild
    .firstElementChild.firstElementChild
    .firstElementChild.value;
  delete parsedData[prop];
  e.currentTarget.parentNode.remove();
}
/* Handle the click event on the button 'Add Table' in cutlist section */
const addTable = document.getElementById('addTable');
addTable.addEventListener('click', () => {
  addTableFunc();
});

/* Insert Row with length and quantity data in cutlist tables */
function addCutListTableRow (table, len, qty) {
  for (let i = 0; i < len.length; i++) {
    table.lastElementChild.insertAdjacentHTML(
      'afterend',
      `<tr><td>1</td><td><input type="text" style="width: 80px;" value="${qty[i]}"></td><td><input type="text" style="width: 80px;;" value="${len[i]}"</td></tr>`
    );
  }
}

let parsedData = {};
const resultTables = [];
/* Table enumeration step and event handler on click of 'tabulate' button */
const tabulate = document.getElementById('inputGroupFileAddon04');
const fileInput = document.getElementById('inputGroupFile04');
tabulate.addEventListener('click', () => {
  const inputFile = fileInput.files[0];
  const reader = new window.FileReader();
  reader.readAsText(inputFile);
  function csvToArray (str, delimiter = ',') {
    const data = {};
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');
    rows.pop();
    for (let i = 0; i < rows.length; i++) {
      rows[i] = rows[i].split(delimiter);
      data[rows[i][2]] = {
        Lengths: [],
        Quantity: []
      };
    }
    for (const type in data) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][2] === type) {
          data[type].Lengths.push(rows[i][3]);
          data[type].Quantity.push(rows[i][1]);
        }
      }
    }
    return data;
  }
  reader.onload = (e) => {
    parsedData = csvToArray(e.target.result);
    for (let i = 0; i < Object.keys(parsedData).length; i++) {
      const table = addTableFunc();
      table
        .lastElementChild
        .firstElementChild
        .firstElementChild
        .firstElementChild
        .firstElementChild
        .value = Object.keys(parsedData)[i];
      addCutListTableRow(
        table.lastElementChild.lastElementChild,
        parsedData[Object.keys(parsedData)[i]].Lengths,
        parsedData[Object.keys(parsedData)[i]].Quantity
      );
    }
    /* Handle Solve button click event */
    const solve = document.getElementById('solve');
    solve.addEventListener('click', () => {
      document.getElementById('resultTab').click();
      window.eel.capture_data(parsedData)((optimized) => {
        let pages = 0;
        for (const i in optimized) {
          resultTables[i] = makeResultTable(optimized[i]);
          pages++;
        }
        paginateResult(pages);
        const layoutTable = document.getElementById('layoutTable');
        tabulateResult(
          layoutTable,
          Object.keys(resultTables)[0],
          resultTables[Object.keys(resultTables)[0]]
        );
        layoutResult();
      });
    });
  };
});

export { resultTables };
