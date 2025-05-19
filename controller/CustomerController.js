import {customer_db} from "../db/Db.js";
import CustomerModel from "../model/CustomerModel.js";



function loadCustomers() {
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

$(`#button-search`).on('click', function(){
    let enterName = $('#search_customer_input').val().toLowerCase();

    if(enterName === ''){
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    $('#customer_table_body').empty();

    for (let i = 0; i <customer_db.length; i++) {
        let item = customer_db[i];
        if(item.name.toLowerCase().includes(enterName)){
            let row = `<tr data-index="${i}">
                           <td>${i + 1}</td>
                           <td>${item.name}</td>
                           <td>${item.address}</td>
                           <td>${item.contact}</td>
                           
                         </tr>`
            $('#customer_table_body').append(row);
        }
    }
});


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


// clear fields

$('#customer-btn_close').on('click', function () {
    $('#customer_name').val("");
    $('#customer_address').val("");
    $('#customer_contact').val("");
})