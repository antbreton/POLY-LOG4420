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
        addToCart(product.id, quantity);
        // TODO: Update count dans localStorage

        // TODO: Update badge with updated count

        // Toast Dialog
        toast('Ajout de ' + quantity + ' "' + product.name + '" dans le panier.');

        // Pour ne pas effectuer le submit
        return false;
    });
});

function addToCart(id, qte)
{
	// get Cart in local storage
	var cartJsonString = localStorage.getItem("cart");
	
	// Si le panier n'a pas encore été ajouté au local storage, on le crée
	if(cartJsonString==null)
		cartJsonString = '{"products":[]}';
	
	// on crée un objet JSON
	var cart = JSON.parse(cartJsonString);
	
	// vérifier si l'id existe déjà
	if(getById(cart.products,id) != undefined) // on ajoute la qté
		getById(cart.products,id).qte=parseInt(getById(cart.products,id).qte)+parseInt(qte);
	else // s'il n'existe pas, on push le nouvel article
		cart.products.push({id,qte});	 
		
	// on crée le json string et on l'ajoute au localStorage
	localStorage.setItem("cart",JSON.stringify(cart));
}

function getById(arr, id) {
    for (var d = 0, len = arr.length; d < len; d += 1) {
        if (arr[d].id === id) {
            return arr[d];
        }
    }
    return null;
}

function toast(text) {
    $("#dialog").text(text).slideDown(450).delay(5000).slideUp(450);
}
