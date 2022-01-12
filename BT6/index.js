"use strict";
exports.__esModule = true;
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var checkAllInput = $('#checkAllInput');
var btnAdd = $('.btn-add');
var deleteRowElement = $$('.btn-row-delete');
var deleteInput = $('.btn-delete-input');
checkAllInput.addEventListener('change', function (event) {
    var ListCheckBox = $$('.form-check-input');
    if (event.currentTarget.checked) {
        ListCheckBox.forEach(function (item, index) {
            if (index != 0) {
                item.checked = true;
            }
        });
    }
    else {
        ListCheckBox.forEach(function (item, index) {
            if (index !== 0) {
                item.checked = false;
            }
        });
    }
});
btnAdd.addEventListener('click', function () {
    addRow();
    checkAllInput.checked = false;
});
deleteInput.addEventListener('click', deleteRowInputChecked);
function addRow() {
    var tableBody = $('.table-body');
    var html = tableBody.innerHTML;
    html += "\n  <tr class=\"table-row\">\n  <th scope=\"row\">\n    <input\n      class=\"form-check-input input-element\"\n      type=\"checkbox\"\n      value=\"\"\n      id=\"flexCheckDefault\"\n    />\n  </th>\n  <td contenteditable=\"true\"></td>\n  <td contenteditable=\"true\"></td>\n  <td contenteditable=\"true\"></td>\n  <td>\n    <button type=\"button\" class=\"btn btn-row-delete btn-secondary\">Delete</button>\n  </td>\n  </tr>";
    tableBody.innerHTML = html;
    deleteRowElement = $$('.btn-row-delete');
    addEventListenerDeleteRow();
}
function addEventListenerDeleteRow() {
    var tableRow = $$('.table-row');
    deleteRowElement.forEach(function (item, index) {
        item.addEventListener('click', function () {
            tableRow[index].remove();
        });
    });
}
function deleteRowInputChecked() {
    var tableRow = $$('.table-row');
    var ListCheckBox = $$('.input-element');
    ListCheckBox.forEach(function (item, index) {
        if (item.checked) {
            tableRow[index].remove();
        }
    });
    checkAllInput.checked = false;
}
