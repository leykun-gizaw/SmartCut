const stockTable = document.querySelector('#stockTable');

function rowRemove () {
  event.target.parentNode.parentNode.remove();
}

function asideHighlight () {
  const projectLinks = document.querySelector('#proj-links');
  for (let i = 0; i < projectLinks.childElementCount; i++) {
    projectLinks.children[i].classList.remove('active');
  }
  event.target.classList.add('active');
}

const addProject = document.querySelector('#addProject');
addProject.addEventListener('click', () => {
  const collapseOne = document.querySelector('#collapseOne');
  const collapseInputChildren = collapseOne.children[0].children[0].childElementCount;
  const projectValues = [];

  let missing = false;
  for (let i = 0; i < collapseInputChildren - 1; i++) {
    projectValues.push(collapseOne.children[0].children[0].children[i].children[0].children[0].value);
  }
  for (let i = 0; i < projectValues.length; i++) {
    if (projectValues[i] === '') {
      missing = true;
    }
  }
  if (!missing) {
    const projectLinks = document.querySelector('#proj-links');
    projectLinks.innerHTML += `<button class="list-group-item list-group-item-action" onclick="asideHighlight();"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">${projectValues[0]}</h5><span class="badge bg-success">On Going</span></div><h6 class="mb-1">CUSTOMER: ${projectValues[1]}</h6><hr/><p class="mb-1">Some placeholder content in a paragraph.</p><div class="row gx-3" style="text-align: center"><div class="col"><div class="border rounded-3 fs-6 fw-light"><small>Started: </small><small>${projectValues[2]}</small></div></div><div class="col"><div class="border rounded-3 fs-6 fw-light"><small>Due: </small><small>${projectValues[3]}</small></div></div></div></button>`;
  }
});

const addStockRow = document.querySelector('#addStockRow');
addStockRow.addEventListener('click', () => {
  console.log('ADD STOCK ROW');
  const stockTable = document.querySelector('#stockTable');
  stockTable.innerHTML += "<tr><th scope=\"row\">3</th><td><input type=\"number\" class=\"form-control\" aria-label=\"Recipient's username\" aria-describedby=\"basic-addon2\"></td><td><input type=\"number\" class=\"form-control\" placeholder=\"000\" aria-label=\"Recipient's username\" aria-describedby=\"basic-addon2\"></td><td><div class=\"input-group\" style=\"margin: auto;\"><input type=\"text\" class=\"table-input form-control\" placeholder=\"0.00\" aria-label=\"Recipient's username\" aria-describedby=\"basic-addon2\" style=\"width: 80px;\"><select class=\"table-select form-select\" aria-label=\"stckLength\" style=\"width: 60px\"><option selected>cm</option><option value=\"1\">mm</option><option value=\"2\">m</option></select></div></td><td><div class=\"input-group\" style=\"margin: auto;\"><input type=\"text\" class=\"table-input form-control\" placeholder=\"0.00\" aria-label=\"Recipient's username\" aria-describedby=\"basic-addon2\" style=\"width: 80px;\"><select class=\"table-select form-select\" aria-label=\"stckLength\" style = \"width: 60px;\"><option selected>ETB</option><option value=\"1\">€</option><option value=\"2\">$</option></select></div></td><td style=\"text-align: center\"><button type=\"button\" class=\"btn btn-outline-danger\" onclick=\"rowRemove();\">Delete Record</button></td></tr>";
});
