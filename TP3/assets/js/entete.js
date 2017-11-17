"use strict"

$(document).ready(() => {
    // TODO: Check localStorage pour count Panier
    computeBadge();
});

function computeBadge() {
	var cart = JSON.parse(localStorage.getItem("cart"));

	if (cart) {
		if (cart.products.length == 0) {
			$(".shopping-cart > .count").hide();
		} else {
			var somme = 0;
			for(var i = 0; i < cart.products.length;i++)
			{
				somme += parseInt(cart.products[i].qte);
			}
			$(".shopping-cart > .count").html(somme).show();
		}
	} else {
		$(".shopping-cart > .count").hide();
	}
}
