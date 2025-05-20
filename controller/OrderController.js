import {customer_db} from "../db/Db.js";
import {item_db} from "../db/Db.js";
import {order_db} from "../db/Db.js";
import OrderModel from "../model/OrderModel.js";

let row = null;

$('#OrderId').val(order_db.length + 1).prop('readonly', true);
loadCustomerIds();loadItemIds();

function loadCustomerIds() {
    const dropdown = $('#CustomerId');
    dropdown.empty();
    dropdown.append('<option value="" disabled selected></option>');

    console.log("customer_db:", customer_db);
    console.log(customer_db.length);

    customer_db.map((customer, index) => {
        console.log(index);

        dropdown.append(`<option value="${index + 1}">${index + 1}</option>`);
    });

    dropdown.on('change', function () {
        const selectedId = $(this).val();
        if (selectedId) {
            const customerIndex = parseInt(selectedId) - 1;
            const customer = customer_db[customerIndex];

            $('#CustomerName').val(customer.name);
            $('#CustomerAddress').val(customer.address);
        } else {
            $('#CustomerName').val('');
            $('#CustomerAddress').val('');
        }
    });

}

function loadItemIds() {
    const dropdown = $('#ItemId');
    dropdown.empty();
    dropdown.append('<option value="" disabled selected></option>');

    console.log("item_db:", item_db);
    console.log(item_db.length)

    item_db.map((customer, index) => {
        console.log(index);

        dropdown.append(`<option value="${index + 1}">${index + 1}</option>`);
    });

    dropdown.on('change', function () {
        const selectedId = $(this).val();
        if (selectedId) {
            const itemIndex = parseInt(selectedId) - 1;
            const item = item_db[itemIndex];

            $('#ItemName').val(item.name);
            $('#Price').val(item.price);

            let itemName = item.name;

            item_db.forEach((item) => {
                if (item.name === itemName) {
                    $('#Quantity').val(item.quantity);
                    console.log(item.quantity);
                    return;
                }
            })

        } else {
            $('#ItemName').val('');
            $('#Price').val('');
            $('#Quantity').val('');
        }
    });
}

$('#button-add-item').on('click', function () { // add items to table
    const itemCode = $('#ItemId').val();
    const itemName = $('#ItemName').val();
    const itemPrice = $('#Price').val();
    const quantity = $('#Order-Quantity').val();

    let idx = 0;

    item_db.forEach((item, index) => {
        if (itemName === item.name) {
            idx = index;
        }
    })

    if (itemCode === '' || itemName === '' || itemPrice === '' || quantity === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    const price = parseFloat(itemPrice);
    const qty = parseInt(quantity);

    if (qty > item_db[idx].quantity) {
        Swal.fire({
            title: 'Error!',
            text: `Only ${item_db[idx].quantity} units available for ${itemCode}.`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    let existingRow = null;
    $('#select-items-table-body tr').each(function () {
        const existingItemCode = $(this).find('td:first').text();
        if (existingItemCode === itemCode) {
            existingRow = $(this);
            return false;
        }
    }); // add karana item eke id eka already table eke thiyanawada balanawa...

    if (existingRow) {
        // Update existing row
        const currentQty = parseInt(existingRow.find('td:nth-child(4)').text());
        const newQty = currentQty + qty;
        const newTotal = price * newQty;

        if (newQty > item_db.quantity) {
            Swal.fire({
                title: 'Error!',
                text: `Only ${item_db.quantity} units available for ${itemCode}.`,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        // Update the row with new price, quantity, and total
        existingRow.find('td:nth-child(3)').text(price); // Update price
        existingRow.find('td:nth-child(4)').text(newQty); // Update quantity
        existingRow.find('td:nth-child(5)').text(newTotal); // Update total

    } else {

        const itemTotal = price * qty;
        const newRow = `
            <tr>
                <td>${itemCode}</td>
                <td>${itemName}</td>
                <td>${itemPrice}</td>
                <td>${quantity}</td>
                <td>${itemTotal}</td>
            </tr>
        `;
        $('#select-items-table-body').append(newRow);
    }

    item_db[idx].quantity -= qty;

    updateTotals();

    $('#ItemId').val('');
    $('#ItemName').val('');
    $('#Price').val('');
    $('#Quantity').val('');
    $('#Order-Quantity').val('');


});

function updateTotals() {
    let total = 0;

    // Iterate through each row in the table
    $('#select-items-table-body tr').each(function () {
        const rowTotal = parseFloat($(this).find('td:nth-child(5)').text()) || 0;
        total += rowTotal;
    });

    // Update the total and sub-total display
    $('#text-sub-total').text(total.toFixed(2)); // Assuming sub-total is same as total for now
}


$('#select-items-table-body').on('click', 'tr', function () {
    row = $(this);
    $('#select-items-table-body tr').removeClass('selected');
    $(this).addClass('selected');

    const code = row.find('td:nth-child(1)').text();
    const name = row.find('td:nth-child(2)').text();
    const price = row.find('td:nth-child(3)').text();
    const qty = row.find('td:nth-child(4)').text();

    $('#update-order-item-code').prop('readonly', true); // code eka change karanna behe..
    $('#update-order-item-name').prop('readonly', true);
    $('#update-order-item-price').prop('readonly', true);


    $('#update-order-item-code').val(code);
    $('#update-order-item-name').val(name);
    $('#update-order-item-price').val(price);
    $('#update-order-item-qty').val(qty);

    $('#staticBackdrop05').modal('show');
});


$('#order_item_update').on('click', function () {
    const code = $('#update-order-item-code').val();
    const name = $('#update-order-item-name').val();
    const price = $('#update-order-item-price').val();
    const qty = $('#update-order-item-qty').val();
    let currentQty = parseInt(row.find('td:nth-child(4)').text());


    let idx = 0;

    item_db.forEach((item, index) => {
        if (name === item.name) {
            idx = index;
        }
    })

    if (code === '' || name === '' || price === '' || qty === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    if (qty > item_db[idx].quantity) {
        Swal.fire({
            title: 'Error!',
            text: `Only ${item_db[idx].quantity} units available for ${itemCode}.`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    let updatedQuantity = (item_db[idx].quantity + currentQty) - qty;

    item_db[idx].quantity = updatedQuantity;


    const priceNum = parseFloat(price);
    const qtyNum = parseInt(qty);
    const newTotal = priceNum * qtyNum;

    row.find('td:nth-child(1)').text(code);
    row.find('td:nth-child(2)').text(name);
    row.find('td:nth-child(3)').text(price);
    row.find('td:nth-child(4)').text(qty);
    row.find('td:nth-child(5)').text(newTotal);

    $('#staticBackdrop05').modal('hide');


});

$('#order_item_delete').on('click', function () {
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
            row.remove(); // Delete the clicked row
            Swal.fire({
                title: "Deleted!",
                text: "Item has been deleted.",
                icon: "success"
            });
            $('#staticBackdrop05').modal('hide');
        }
    });
})

function applyDiscount() {
    const discountInput = $('#Discount').val().trim();
    let discountAmount = 0;

    discountAmount = parseFloat(discountInput) || 0;

    let subTotal = parseFloat($('#text-sub-total').text() || 0);

    let total = subTotal - discountAmount;

    $('#text-total').text(total.toFixed(2));
}

$('#Discount').on('input', function () {
    applyDiscount();
});

function balanceCalculate() {
    const cashInput = $('#cash').val().trim();
    const totalInput = $('#text-total').text().trim() || 0;

    let cashAmount = 0;
    let total = parseFloat(totalInput) || 0;

    cashAmount = parseFloat(cashInput) || 0;

    let balance = cashAmount - total;

    $('#Balance').val(balance.toFixed(2));

}

$('#cash').on('input', function () {
    balanceCalculate();
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


$('#button-purchase').on('click', function () {

    console.log("click nam wenawa")

    // Check if cart is empty
    if ($('#select-items-table-body tr').length === 0) {
        Swal.fire({
            title: 'Error!',
            text: 'Cart is empty. Add items to proceed.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    const customerId = $('#CustomerId').val().trim();


    $('#select-items-table-body tr').each(function () {
        const itemCode = $(this).find('td:nth-child(1)').text();
        const price = $(this).find('td:nth-child(3)').text();
        const quantity = $(this).find('td:nth-child(4)').text();
        const total = $(this).find('td:nth-child(5)').text();
        const orderDate = $('#date').val();

        let order_model = new OrderModel(orderDate, customerId, itemCode, price, quantity, total);

        order_db.push(order_model);

    });

    $('#select-items-table-body').empty();

    $('#OrderId').val(order_db.length + 1);
    $('#text-total').text('0.00');
    $('#text-sub-total').text('0.00');
    $('#Discount').val('');
    $('#cash').val('');
    $('#Balance').val('');
    $('#CustomerId').val('');
    $('#CustomerName').val('');
    $('#date').val('');
    $('#CustomerAddress').val('');

    loadAllOrders();

    // Show success message
    Swal.fire({
        title: 'Success!',
        text: 'Order placed successfully.',
        icon: 'success',
        confirmButtonText: 'Ok'
    });

});

$('#clear').click(function () {
    $('#OrderId').val(order_db.length + 1).prop('readonly', true);
    $('#CustomerId').val('');
    $('#CustomerName').val('');
    $('#date').val('');
    $('#CustomerAddress').val('');
    $('#ItemId').val('');
    $('#ItemName').val('');
    $('#Price').val('');
    $('#Quantity').val('');
    $('#Discount').val('');
    $('#Balance').val('');
    $('#cash').val('');
    $('#Order-Quantity').val('');
    $('#text-total').text('0.00');
    $('#text-sub-total').text('0.00');
    $('#select-items-table-body').empty();

});


export {loadCustomerIds};
export {loadItemIds}