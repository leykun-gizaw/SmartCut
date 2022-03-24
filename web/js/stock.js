/* Remove Stock table records when delete button is clicked */
const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', (e) => {
  e.currentTarget.parentNode.parentNode.remove();
});

