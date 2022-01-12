const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const checkAllInput = $('#checkAllInput');
const btnAdd = $('.btn-add');
let deleteRowElement = $$('.btn-row-delete');
const deleteInput = $('.btn-delete-input');

checkAllInput.addEventListener('change', (event) => {
  const ListCheckBox = $$('.form-check-input');
  if (event.currentTarget.checked) {
    ListCheckBox.forEach((item, index) => {
      if (index != 0) {
        item.checked = true;
      }
    });
  } else {
    ListCheckBox.forEach((item, index) => {
      if (index !== 0) {
        item.checked = false;
      }
    });
  }
});

btnAdd.addEventListener('click', () => {
  addRow();
  checkAllInput.checked = false;
});

deleteInput.addEventListener('click', deleteRowInputChecked);
function addRow() {
  const tableBody = $('.table-body');
  let html = tableBody.innerHTML;
  html += `
  <tr class="table-row">
  <th scope="row">
    <input
      class="form-check-input input-element"
      type="checkbox"
      value=""
      id="flexCheckDefault"
    />
  </th>
  <td contenteditable="true"></td>
  <td contenteditable="true"></td>
  <td contenteditable="true"></td>
  <td>
    <button type="button" class="btn btn-row-delete btn-secondary">Delete</button>
  </td>
  </tr>`;
  tableBody.innerHTML = html;
  deleteRowElement = $$('.btn-row-delete');
  addEventListenerDeleteRow();
}

function addEventListenerDeleteRow() {
  const tableRow = $$('.table-row');
  deleteRowElement.forEach((item, index) => {
    item.addEventListener('click', () => {
      tableRow[index].remove();
    });
  });
}

function deleteRowInputChecked() {
  const tableRow = $$('.table-row');
  const ListCheckBox = $$('.input-element');
  ListCheckBox.forEach((item, index) => {
    if (item.checked) {
      tableRow[index].remove();
    }
  });
  checkAllInput.checked = false;
}
