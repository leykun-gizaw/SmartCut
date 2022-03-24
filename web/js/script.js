import {
  makeResultTable,
  paginateResult,
  tabulateResult,
  layoutResult
} from './visualize.js';
import { makeProjectCardTree, makeProjectCard } from './aside.js';

/* Remove Stock table records when delete button is clicked */
const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', (e) => {
  e.currentTarget.parentNode.parentNode.remove();
});

/* Highlight Projects on aside when clicked on */
function asideHighlight (e) {
  const projectLinks = document.getElementById('proj-links');
  for (let i = 0; i < projectLinks.childElementCount; i++) {
    projectLinks.children[i].classList.remove('active');
  }
  e.currentTarget.classList.add('active');
}

/* Make tabs interactive and change display property of different sections */
const stockTab = document.getElementById('stockTab');
const cutlistTab = document.getElementById('cutlistTab');
const factorsTab = document.getElementById('factorsTab');
const resultTab = document.getElementById('resultTab');

stockTab.addEventListener('click', changeSection);
cutlistTab.addEventListener('click', changeSection);
factorsTab.addEventListener('click', changeSection);
resultTab.addEventListener('click', changeSection);

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
    const sections = document.getElementById('sections');
    if (e.currentTarget.innerText === 'Stock') {
      sections.children[0].style.display = 'grid';
      sections.children[1].style.display = 'none';
      sections.children[2].style.display = 'none';
    } else if (e.currentTarget.innerText === 'Cut List') {
      sections.children[0].style.display = 'none';
      sections.children[1].style.display = 'grid';
      sections.children[2].style.display = 'none';
    } else if (e.currentTarget.innerText === 'Result') {
      sections.children[0].style.display = 'none';
      sections.children[1].style.display = 'none';
      sections.children[2].style.display = 'grid';
    }
  }
}

/* Add project to aside Element when 'Add Project' button is clicked */
const addProject = document.getElementById('addProject');
addProject.addEventListener('click', () => {
  const collapseOne = document.getElementById('collapseOne');
  const collapseInputChildren =
    collapseOne.children[0].children[0].childElementCount;
  const projectValues = [];
  let missing = false;
  for (let i = 0; i < collapseInputChildren - 1; i++) {
    projectValues.push(
      collapseOne.children[0].children[0].children[i].children[0].children[0]
        .value
    );
  }
  for (let i = 0; i < projectValues.length; i++) {
    if (projectValues[i] === '') {
      missing = true;
    }
  }
  const projectLinks = document.getElementById('proj-links');
  if (!missing && projectValues[2] < projectValues[3]) {
    const projectCard = makeProjectCard(
      projectValues[0], projectValues[1], projectValues[2], projectValues[3]
    );
    projectLinks.append(makeProjectCardTree(projectCard).element);
    for (let i = 0; i < projectLinks.childElementCount; i++) {
      projectLinks.children[i].addEventListener('click', asideHighlight);
    }
  }
});

/* Handle the click event on the button located below stock table */
const addStockRow = document.getElementById('addStockRow');
addStockRow.addEventListener('click', () => {
  const stockTable = document.getElementById('stockTable');
  stockTable.lastElementChild.insertAdjacentHTML(
    'afterend',
    '<tr><th scope="row" class="small-width">3</th><td><input type="text" class="form-control" aria-label="Recipient\'s username" aria-describedby="basic-addon2"></td><td><input type="number" class="form-control" placeholder="000" aria-label="Recipient\'s username" aria-describedby="basic-addon2"></td><td><div class="input-group" style="margin: auto;"><input type="text" class="table-input form-control" placeholder="0.00" aria-label="Recipient\'s username" aria-describedby="basic-addon2" style="width: 80px;"><select class="table-select form-select" aria-label="stckLength" style="width: 60px"><option selected>cm</option><option value="1">mm</option><option value="2">m</option></select></div></td><td><div class="input-group" style="margin: auto;"><input type="text" class="table-input form-control" placeholder="0.00" aria-label="Recipient\'s username" aria-describedby="basic-addon2" style="width: 80px;"><select class="table-select form-select" aria-label="stckLength" style = "width: 60px;"><option selected>ETB</option><option value="1">€</option><option value="2">$</option></select></div></td><td class="buttonsCell" style="text-align: center"><a href="#" class="link-primary fw-bold"><i class="fas fa-edit fa-2x"></i></a><a href="#" class="link-success fw-bold"><i class="fas fa-save fa-2x"></i></a> <a href="#" class="link-danger fw-bold" id="deleteBtn" onclick="rowRemove();"><i class="fas fa-trash-alt fa-2x"></i></a></td></tr>'
  );
});

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
