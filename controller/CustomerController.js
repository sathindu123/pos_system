import {customer_db} from "../db/Db.js";
import CustomerModel from "../model/CustomerModel.js";

$('#update_customer').css("display", "none");
$('#delete_customer').css("display", "none");

// load all customers

$('#button-search3').on('click', function() {
    if ($('.customer-table').length) {
        $('html, body').animate({
            scrollTop: $('.customer-table').offset().top
        }, 1000);
    } else {
        alert('Home section not found!');
    }
});

function loadCustomers() {
    $('#update_customer').css("display", "none");
    $('#delete_customer').css("display", "none");
    $('#customer_table_body').empty();

    customer_db.map((item, index) => {
        let name = item.name;
        let address = item.address;
        let contact = item.contact;

        let data = `<tr data-index="${index}"> 
                                <td>${index + 1}</td>
                                <td>${name}</td>
                                <td>${address}</td>
                                <td>${contact}</td>     
                            </tr>`

        $('#customer_table_body').append(data);

    })
}

// search customer

$(`#button-search`).on('click', function () {

    let enteredName = $('#search_customer_input').val().toLowerCase();

    if (enteredName === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    $('#customer_table_body').empty();

    for (let i = 0; i < customer_db.length; i++) {
        let item = customer_db[i];
        if (item.name.toLowerCase().includes(enteredName)) {
            let row = `<tr data-index="${i}">
                           <td>${i + 1}</td>
                           <td>${item.name}</td>
                           <td>${item.address}</td>
                           <td>${item.contact}</td>
                       </tr>`;
            $('#customer_table_body').append(row);
        }
    }
});

// clear input field and load customers

$(`#button-search-clear`).on('click', function () {
    $('#search_customer_input').val("")

    loadCustomers();
});

// save customer


$(`#save_customer`).on('click', function () {
    let name = $('#customer_name').val();
    let address = $('#customer_address').val();
    let contact = $('#customer_contact').val();

    if (name === '' || address === '' || contact === '') {

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

    } else {

        let customer_data = new CustomerModel(name, address, contact);

        customer_db.push(customer_data);

        loadCustomers();

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });

        $('#customer_name').val("");
        $('#customer_address').val("");
        $('#customer_contact').val("");

    }
})

// update customer

$('#update_customer').on('click', function () {
    let idx = $('.selected').data('index');
    let name = $('#customer_name').val();
    let address = $('#customer_address').val();
    let contact = $('#customer_contact').val();

    if (name === '' || address === '' || contact === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    } else {
        customer_db[idx] = new CustomerModel(name, address, contact);

        loadCustomers();

        Swal.fire({
            title: "Updated Successfully!",
            icon: "success",
            draggable: true
        });

        $('#staticBackdrop02').modal('hide');

    }
})

// delete customer

$('#delete_customer').on('click', function () {
    let idx = $('.selected').data('index');

    if (idx === undefined) {
        Swal.fire({
            title: 'Error!',
            text: 'Please select a customer to delete',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    } else {
        // customer_db.splice(idx, 1); // idx eke idan item 1k delete karanna
        //
        // loadCustomers();
        //
        // Swal.fire({
        //     title: "Deleted Successfully!",
        //     icon: "success",
        //     draggable: true
        // });

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
                customer_db.splice(idx, 1); // idx eke idan item 1k delete karanna
                loadCustomers();
                Swal.fire({
                    title: "Deleted!",
                    text: "Customer has been deleted.",
                    icon: "success"
                });
            }
        });

        $('#staticBackdrop02').modal('hide');
    }
});

// select customer

$('#customer_table_body').on('click', 'tr', function () {
    $('#update_customer').css("display", "block");
    $('#delete_customer').css("display", "block");
    $('#customer_table_body tr').removeClass('selected');
    $(this).addClass('selected');
    let idx = $(this).data('index');
    let obj = customer_db[idx];

    $('#update_customer_id').prop('readonly', true); // id eka change karanna behe..

    let id = (idx + 1);
    let name = obj.name;
    let address = obj.address;
    let contact = obj.contact;

    $('#customer_id').val(id);
    $('#customer_name').val(name);
    $('#customer_address').val(address);
    $('#customer_contact').val(contact);

    $('#staticBackdrop02').modal('show');
});

// clear fields

$('#customer-btn_close').on('click', function () {
    $('#update_customer').css("display", "none");
    $('#delete_customer').css("display", "none");
    $('#customer_name').val("");
    $('#customer_address').val("");
    $('#customer_contact').val("");
})