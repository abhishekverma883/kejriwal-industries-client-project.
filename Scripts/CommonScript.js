
$(document).ready(function () {
    $(document).bind("contextmenu", function (e) {
        e.preventDefault();
    });

    $("#btnSubscription").click(function () {

        $("#subscriptionMsg").empty();
        $("#subscription").css('border', '');
        if ($("#subscription").val() == "") {
            $("#subscription").css('border', '1px solid red');
        }
        else {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var valid = regex.test($("#subscription").val());
            if (!valid) {
                $("#subscription").css('border', '1px solid red');
                $("#subscriptionMsg").append("Invalid Email");
            }
            else {
                $.ajax({
                    url: "/Home/Subscriber",
                    type: "POST",
                    data: { 'Email': $("#subscription").val() },
                    success: function (result) {
                        $("#subscriptionMsg").empty().append("Subscription Added successfully");
                    }, error: function (error) { }
                })
            }
        }

    });
});

function ProductAddtoCartQuantity(loProductId, loQuanity) {

    $("html, body").animate({ scrollTop: 0 }, "slow");

    var pid = loProductId;
    $.ajax({
        url: "/Cart/AddToCartQuantity",
        type: "POST",
        data: { 'pid': pid, 'intQuanity': loQuanity },
        success: function (result) {
            showSessionMessage("Product added to your shopping cart.");
            $('#cart').load('/Cart/ShowHeaderCart');
        }, error: function (error) { }
    })
}

function showSessionMessage(foMessage) {
    $("#divAddedToCart").empty();
    $("#divAddedToCart").text(foMessage);
    $("#divAddedToCart").fadeIn(500);
    $("#divAddedToCart").fadeOut(2500);
}

function RemoveProductFromHeaderCart(loCartid) {

    $.ajax({
        url: "/Cart/RemoveItem",
        type: "POST",
        data: { 'cartid': loCartid, 'pid': 0 },
        success: function (result) {
            showSessionMessage("Product delete from your shopping cart.");
            $('#cart').load('/Cart/ShowHeaderCart');
        }, error: function (error) { }
    })
}

function AddtoWishList(ths) {

    $.ajax({
        url: "/Cart/MoveToWishListFromPD",
        type: "GET",
        data: { 'pid': $(ths).data("id"), 'psizeid': 0 },
        /*dataType: "json",*/
        success: function (result) {

            if (result == "0") {
                showSessionMessage("Please do login to use this option.");
            } else {
                showSessionMessage($(ths).data("name") + "added to your wishlist successfully");
            }
        },
        error: function (error) { alert("Internal error."); }
    });


}

