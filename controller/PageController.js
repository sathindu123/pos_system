$("#customer").css("display", "none");
$("#item").css("display", "none");
$("#order-section").css("display", "none");



$("#home-nav").on('click', function() {
    $("#home").css("display", "block");
    $("#customer").css("display", "none");
    $("#item").css("display", "none");
})

$("#customer-nav").on('click', function () {
    $("#customer").css("display", "block");
    $("#item").css("display", "none");
    $("#order-section").css("display", "none");
})

$("#item-nav").on('click', function () {
    $("#customer").css("display", "none");
    $("#item").css("display", "block");
    $("#order-section").css("display", "none");


})

$("#place-nav").on('click', function () {
    $("#customer").css("display", "none");
    $("#item").css("display", "none");
    $("#order-section").css("display", "block");
})