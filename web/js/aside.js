import { elmMake, appendToParent } from './utilities.js';

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
  const projectCard = appendToParent(
    elmMake(
      'button', { clsLst: ['list-group-item', 'list-group-item-action'] }
    ),
    [
      appendToParent(
        elmMake(
          'div', { clsLst: ['d-flex', 'w-100', 'justify-content-between'] }
        ),
        [
          elmMake('h5', { clsLst: ['mb-1'], cont: `Project: ${project}` }),
          elmMake('span', { clsLst: ['badge', 'bg-success'], cont: 'onging' })
        ]
      ),
      elmMake('h6', { clsLst: ['mb-1'], cont: `CUSTOMER: ${customer}` }),
      elmMake('hr'),
      elmMake('p', { clsLst: ['mb-1'], cont: 'Small Placeholder paragraph' }),
      appendToParent(
        elmMake('div', { clsLst: ['row'] }),
        [
          appendToParent(
            elmMake('div', { clsLst: ['col', 'fs-6', 'fw-light'] }),
            [
              elmMake(
                'div',
                { clsLst: ['border', 'rounded-3'], cont: `Start: ${began}` }
              ),
              elmMake(
                'div',
                { clsLst: ['border', 'rounded-3'], cont: `End: ${ends}` }
              )
            ]
          )
        ]
      )
    ]
  );
  return projectCard;
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
      collapseOne
        .children[0]
        .children[0]
        .children[i]
        .children[0]
        .children[0]
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
    projectLinks.append(makeNodeTree(projectCard).element);
    for (let i = 0; i < projectLinks.childElementCount; i++) {
      projectLinks.children[i].addEventListener('click', asideHighlight);
    }
  }
});

/* Highlight Projects on aside when clicked on */
function asideHighlight (e) {
  const projectLinks = document.getElementById('proj-links');
  for (let i = 0; i < projectLinks.childElementCount; i++) {
    projectLinks.children[i].classList.remove('active');
  }
  e.currentTarget.classList.add('active');
}

export { makeProjectCard };
