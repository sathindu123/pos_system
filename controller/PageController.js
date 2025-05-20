$("#customer").css("display", "none");
$("#item").css("display", "none");
$("#order-section").css("display", "none");
$("#order-history-section").css("display", "none");


$("#place-nav-01").on('click', function () {
    $("#home").css("display", "none");
    $("#customer").css("display", "none");
    $("#item").css("display", "none");
    $("#order-section").css("display", "none");
    $("#order-history-section").css("display", "block");
})

$("#home-nav").on('click', function() {
    $("#home").css("display", "block");
    $("#customer").css("display", "none");
    $("#item").css("display", "none");
    $("#order-history-section").css("display", "none");
    $("#order-section").css("display", "none");
})

$("#customer-nav").on('click', function () {
    $("#home").css("display", "none");
    $("#customer").css("display", "block");
    $("#item").css("display", "none");
    $("#order-history-section").css("display", "none");
    $("#order-section").css("display", "none");
})

$("#item-nav").on('click', function () {
    $("#home").css("display", "none");
    $("#customer").css("display", "none");
    $("#item").css("display", "block");
    $("#order-history-section").css("display", "none");
    $("#order-section").css("display", "none");

})

$("#place-nav").on('click', function () {
    $("#home").css("display", "none");
    $("#customer").css("display", "none");
    $("#item").css("display", "none");
    $("#order-section").css("display", "block");
    $("#order-history-section").css("display", "none");
})