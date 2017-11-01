"use strict"

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

$.getJSON("data/products.json", function(data) {
    var product = data.find((p) => {return p.id == $.urlParam("id")});
    if (product) {
        $("#product").data("product", product);
        $("#product-name").text(product.name);
        $("#product-image").attr("src", "./assets/img/" + product.image).attr("alt", product.name);
        $("#product-desc").html(product.description);
        $.each(product.features, (i, e) => {
            $("#product-features").append($("<li></li>").html(e));
        });
        $("#product-price").text(product.price.toLocaleString("fr-CA", {useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2}) + "$");
    
    } else {
        $("#product").empty().html("<h1>Page non trouvée!</h2>");
    }
});

$(document).ready(() => {
    $("#add-to-cart-form").submit(function(event) {
        event.preventDefault();
        event.stopPropagation();
        var quantity = $("#product-quantity").val();
        var product = $("#product").data("product");

        // TODO: Add produit dans localStorage
        
        // TODO: Update count dans localStorage

        // TODO: Update badge with updated count

        // Toast Dialog
        toast('Ajout de ' + quantity + ' "' + product.name + '" dans le panier.');

        // Pour ne pas effectuer le submit
        return false;
    });
});

function toast(text) {
    $("#dialog").text(text).slideDown(450).delay(5000).slideUp(450);
}