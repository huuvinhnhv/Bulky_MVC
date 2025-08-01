﻿var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        ajax: { url: '/admin/product/getall' },
        columns: [
            { data: 'title', "width": "15%" },
            { data: 'isbn', "width": "15%" },
            { data: 'listPrice', "width": "15%" },
            { data: 'author', "width": "15%" },
            { data: 'category.name', "width": "15%" },
            {
                data: 'id',
                render: function (data) {
                    consol.log(data)
                    return `
                        <div class="w-75 btn-group" role="group">
                            <a href="/admin/product/upsert?id=${data}" class="btn btn-warning mx-2">
                                <i class="bi bi-pencil-square"></i> Edit
                            </a>
                            <a onClick=Delete('/admin/product/delete/${data}') class="btn btn-danger mx-2">
                                <i class="bi bi-trash3"></i> Delete
                            </a>
                        </div>
                    `;
                },
                width: "25%"
            }
        ]
    });
}
function Delete(url) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: (data) => {
                    dataTable.ajax.reload();
                    toastr.success(data.success);
                }
            });
        }
    });
}
