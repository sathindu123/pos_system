export default class OrderModel {
    constructor(orderDate, customerId, itemCode, price, quantity, total) {
        this.orderDate = orderDate;
        this.customerId = customerId;
        this.itemCode = itemCode;
        this.price = price;
        this.quantity = quantity;
        this.total = total;
    }
}