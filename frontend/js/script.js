const stockTable = document.querySelector("#stockTable");

function rowRemove() {
  event.target.parentNode.parentNode.remove();
}

function asideHighlight() {
  const projectLinks = document.querySelector("#proj-links");
  for (let i = 0; i < projectLinks.childElementCount; i++) {
    projectLinks.children[i].classList.remove("active");
  }
  event.target.classList.add("active");
}

function changeSection() {
  const tabsUL = event.target.parentNode.parentNode;
  if (!event.target.classList.contains('active')) {
    for (let i = 0; i < tabsUL.childElementCount; i++) {
      if (tabsUL.children[i].children[0].classList.contains('active')) {
        tabsUL.children[i].children[0].classList.remove('active');
        tabsUL.children[i].children[0].classList.add('text-light');
      }
    }
    event.target.classList.add('active');
    const sections = document.querySelector('#sections');
    if (event.target.innerText === 'Stock') {
      sections.children[0].style.display = 'block';
      sections.children[1].style.display = 'none';
      sections.children[2].style.display = 'none';
    } else if (event.target.innerText === 'Cut List') {
      sections.children[0].style.display = 'none';
      sections.children[1].style.display = 'grid';
      sections.children[2].style.display = 'none';
    } else if (event.target.innerText === 'Result') {
      sections.children[0].style.display = 'none';
      sections.children[1].style.display = 'none';
      sections.children[2].style.display = 'block';
    }
  }
}

const addProject = document.querySelector("#addProject");
addProject.addEventListener("click", () => {
  const collapseOne = document.querySelector("#collapseOne");
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
    if (projectValues[i] === "") {
      missing = true;
    }
  }
  if (!missing) {
    const projectLinks = document.querySelector("#proj-links");
    projectLinks.innerHTML += `<button class="list-group-item list-group-item-action" onclick="asideHighlight();"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">${projectValues[0]}</h5><span class="badge bg-success">On Going</span></div><h6 class="mb-1">CUSTOMER: ${projectValues[1]}</h6><hr/><p class="mb-1">Some placeholder content in a paragraph.</p><div class="row gx-3" style="text-align: center"><div class="col"><div class="border rounded-3 fs-6 fw-light"><small>Started: </small><small>${projectValues[2]}</small></div></div><div class="col"><div class="border rounded-3 fs-6 fw-light"><small>Due: </small><small>${projectValues[3]}</small></div></div></div></button>`;
  }
});

const addStockRow = document.querySelector("#addStockRow");
addStockRow.addEventListener("click", () => {
  const stockTable = document.querySelector("#stockTable");
  stockTable.innerHTML +=
    '<tr><th scope="row" class="small-width">3</th><td><input type="number" class="form-control" aria-label="Recipient\'s username" aria-describedby="basic-addon2"></td><td><input type="number" class="form-control" placeholder="000" aria-label="Recipient\'s username" aria-describedby="basic-addon2"></td><td><div class="input-group" style="margin: auto;"><input type="text" class="table-input form-control" placeholder="0.00" aria-label="Recipient\'s username" aria-describedby="basic-addon2" style="width: 80px;"><select class="table-select form-select" aria-label="stckLength" style="width: 60px"><option selected>cm</option><option value="1">mm</option><option value="2">m</option></select></div></td><td><div class="input-group" style="margin: auto;"><input type="text" class="table-input form-control" placeholder="0.00" aria-label="Recipient\'s username" aria-describedby="basic-addon2" style="width: 80px;"><select class="table-select form-select" aria-label="stckLength" style = "width: 60px;"><option selected>ETB</option><option value="1">€</option><option value="2">$</option></select></div></td><td style="text-align: center"><button type="button" class="btn btn-outline-danger" onclick="rowRemove();">Delete Record</button></td></tr>';
});

const addTable = document.querySelector('#addTable');
addTable.addEventListener('click', () => {
  const tableSection = document.querySelector('#midSection');
  tableSection.innerHTML += `<div class="c1_r1"><button class="btn btn-danger btn-sm hidden-table-delete"><i class="fas fa-window-close fa-sm"></i></button><table class="importsTable table table-sm table-bordered"><thead><tr><th colspan="3">Rectangular Holo Section</th></tr></thead><tbody><tr><td>No</td><td>Quantity</td><td>Length(cm)</td></tr><tr><td scope="row">1</td><td><input type="number" name="" style="width: 80px"></td><td><input type="number" name="" style="width: 80px"></td></tr><tr><td scope="row">2</td><td><input type="number" name="" style="width: 80px"></td><td><input type="number" name="" style="width: 80px"></td></tr><tr><td scope="row">3</td><td><input type="number" name="" style="width: 80px"></td><td><input type="number" name="" style="width: 80px"></td></tr></tbody></table></div>`
});
