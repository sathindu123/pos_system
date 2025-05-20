import {customer_db, item_db} from "../db/Db.js";
import ItemModel from "../model/ItemModel.js";

// load all items

$('#update_item').css("display", "none");
$('#delete_item').css("display", "none");


$('#button-search3Item').on('click', function() {
    loadItems();
    if ($('.item-table').length) {
        $('html, body').animate({
            scrollTop: $('.item-table').offset().top
        }, 1000);
    } else {
        alert('Home section not found!');
    }
});




function loadItems(){
    $('#update_item').css("display", "none");
    $('#delete_item').css("display", "none");
    $('#item_table_body').empty();

    item_db.map((item, index) => {
        let name = item.name;
        let price = item.price;
        let quantity = item.quantity;

        let data = `<tr data-index="${index}"> 
                                <td>${index + 1}</td>
                                <td>${name}</td>
                                <td>${price}</td>
                                <td>${quantity}</td>                 
                            </tr>`

        $('#item_table_body').append(data);

    })
}

// save item

$(`#save_item`).on('click', function(){
    let name = $('#item_name').val();
    let price = $('#item_price').val();
    let quantity = $('#item_quantity').val();

    console.log(name)

    if (name === '' || price === '' || quantity === '') {

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

    } else {

        let item_date = new ItemModel(name, price, quantity);

        item_db.push(item_date);

        console.log(item_db);

        loadItems();

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });

        $('#item_name').val("");
        $('#item_price').val("");
        $('#item_quantity').val("");

    }
})

$(`#btn-item-search`).on('click', function(){
    let enterName = $('#search_item_input').val().toLowerCase();

    if(enterName === ''){
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    $('#item_table_body').empty();

    for (let i = 0; i < item_db.length; i++) {
        let item = item_db[i];
        if(item.name.toLowerCase().includes(enterName)){
            let row = `<tr data-index="${i}">
                           <td>${i + 1}</td>
                           <td>${item.name}</td>
                           <td>${item.price}</td>
                           <td>${item.quantity}</td>
                       </tr>`;
            $('#item_table_body').append(row);
        }
    }
});

$(`#btn-item-search-clear`).on('click', function(){
   $('#search_item_input').val("")
    loadItems();
});


$('#update_item').on('click', function () {
    let idx = $('.selected').data('index');
    let name = $('#item_name').val();
    let price = $('#item_price').val();
    let quantity = $('#item_quantity').val();

    if (name === '' || price === '' || quantity === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    } else {
        item_db[idx] = new ItemModel(name, price, quantity);

        loadItems();

        Swal.fire({
            title: "Updated Successfully!",
            icon: "success",
            draggable: true
        });

        $('#staticBackdrop04').modal('hide');

    }
})

// delete item

$('#delete_item').on('click', function () {
    let idx = $('.selected').data('index');

    if (idx === undefined) {
        Swal.fire({
            title: 'Error!',
            text: 'Please select a item to delete',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    } else {
        // item_db.splice(idx, 1); // idx eke idan item 1k delete karanna
        //
        // loadItems();
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
                item_db.splice(idx, 1); // idx eke idan item 1k delete karanna
                loadItems();
                Swal.fire({
                    title: "Deleted!",
                    text: "Customer has been deleted.",
                    icon: "success"
                });
            }
        });

        $('#staticBackdrop04').modal('hide');
    }
});

$('#item_table_body').on('click', 'tr', function () {
    $('#update_item').css("display", "block");
    $('#delete_item').css("display", "block");
    $('#item_table_body tr').removeClass('selected');
    $(this).addClass('selected');
    let idx = $(this).data('index');
    let obj = item_db[idx];

    $('#update_item_code').prop('readonly', true); // id eka change karanna behe..

    let id = (idx+1);
    let name = obj.name;
    let price = obj.price;
    let quantity = obj.quantity;

    $('#item_code').val(id);
    $('#item_name').val(name);
    $('#item_price').val(price);
    $('#item_quantity').val(quantity);


    $('#staticBackdrop04').modal('show');

});

// clear fields

$('#item-btn_close').on('click', function () {
    $('#update_item').css("display", "none");
    $('#delete_item').css("display", "none");
    $('#item_name').val("");
    $('#item_price').val("");
    $('#item_quantity').val("");
})