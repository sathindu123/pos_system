$("#customer").css("display", "none");


$("#home-nav").on('click', function() {
    $("#home").css("display", "block");
    $("#customer").css("display", "none");
})

$("#customer-nav").on('click', function () {
    $("#customer").css("display", "block");
})

$("#item-nav").on('click', function () {
    $("#customer").css("display", "none");
})