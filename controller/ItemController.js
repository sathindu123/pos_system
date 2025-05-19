import {customer_db, item_db} from "../db/Db.js";
import ItemModel from "../model/ItemModel.js";

// load all items

function loadItems(){
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



// clear fields

$('#item-btn_close').on('click', function () {
    $('#item_name').val("");
    $('#item_price').val("");
    $('#item_quantity').val("");
})