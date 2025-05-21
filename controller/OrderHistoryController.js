import {order_db} from "../db/Db.js";

$('#button-search-customer-order').on('click', function(){

    let enteredId = $('#search_customer_id_input').val();

    if (enteredId === ''){
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    $('#order-history-table-body').empty();

    for (let i = 0; i < order_db.length; i++) {
        let item = order_db[i];
        if (item.customerId.includes(enteredId)) {
            let row = `<tr>
                                <td>${i + 1}</td>
                                <td>${item.customerId}</td>
                                <td>${item.itemCode}</td>
                                <td>${item.price}</td>
                                <td>${item.quantity}</td>
                                <td>${item.total}</td>
                                <td>${item.orderDate}</td>
                            </tr>`;
            $('#order-history-table-body').append(row);
        }
    }

})

// clear input field and load customer orders

$(`#button-search-clear-customer-order`).on('click', function(){
    $('#search_customer_id_input').val("")

    loadAllOrders();
});

function loadAllOrders() {

    $('#order-history-table-body').empty();

    order_db.map((order, index) => {
        let customerId = order.customerId;
        let orderDate = order.orderDate;
        let itemCode = order.itemCode;
        let price = order.price;
        let quantity = order.quantity;
        let total = order.total;

        // Create new row for order table
        const newRow = `
            <tr>
                <td>${index + 1}</td>
                <td>${customerId}</td>
                <td>${itemCode}</td>
                <td>${price}</td>
                <td>${quantity}</td>
                <td>${total}</td>
                <td>${orderDate}</td>
            </tr>
        `;

        // Append to order table
        $('#order-history-table-body').append(newRow);

    })

}
