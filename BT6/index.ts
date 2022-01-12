export {};
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const checkAllInput = $('#checkAllInput');
const btnAdd = $('.btn-add');
let deleteRowElement = $$('.btn-row-delete');
const deleteInput = $('.btn-delete-input');

checkAllInput.addEventListener('change', (event) => {
  const ListCheckBox = $$('.form-check-input');
  if ((event.currentTarget as HTMLInputElement).checked) {
    ListCheckBox.forEach((item: any, index: number) => {
      if (index != 0) {
        item.checked = true;
      }
    });
  } else {
    ListCheckBox.forEach((item: any, index: number) => {
      if (index !== 0) {
        item.checked = false;
      }
    });
  }
});

btnAdd.addEventListener('click', () => {
  addRow();
  (checkAllInput as HTMLInputElement).checked = false;
});

deleteInput.addEventListener('click', deleteRowInputChecked);
function addRow(): void{
  const tableBody = $('.table-body');
  let html: string = tableBody.innerHTML;
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

function addEventListenerDeleteRow(): void{
  const tableRow = $$('.table-row');
  deleteRowElement.forEach((item: any, index: number) => {
    item.addEventListener('click', () => {
      tableRow[index].remove();
    });
  });
}

function deleteRowInputChecked(): void {
  const tableRow = $$('.table-row');
  const ListCheckBox = $$('.input-element');
  ListCheckBox.forEach((item:any, index: number) => {
    if (item.checked) {
      tableRow[index].remove();
    }
  });
  (checkAllInput as HTMLInputElement).checked = false;
}
