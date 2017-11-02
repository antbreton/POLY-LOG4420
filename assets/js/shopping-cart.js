$(document).ready(() => {

	//
});

var productsInformatations;

$.getJSON("data/products.json", function(data) {

	productsInformatations=data;
	computeCart();
});

function computeCart()
{
		// Get LocalStorage
		var cart = JSON.parse(localStorage.getItem("cart"));
		
		// If its empty, then display a message
		if(cart.products.length == 0)
		{
			document.getElementById("shopping-cart").innerHTML="<h1>Panier</h1><p>Aucun produit dans le panier.</p>";
			return;
		}
		
		var productsInCart = [];
		
		// get cart items
		for(var i = 0; i< cart.products.length;i++)
		{
			productsInCart.push({"p":productsInformatations.find((p) => {return p.id == cart.products[i].id}), "qte":cart.products[i].qte});
		}

		// sort By Name
		productsInCart.sort(sortByName);
		
		document.getElementById('products-tbody').innerHTML="";

		var totalOrderAmount = 0;
		// Afficher le panier
		for(var i = 0; i<productsInCart.length;i++)
		{
			var tableRow="";
			tableRow+='<tr><td><button class="remove-item-button" onclick="deleteFromCart('+productsInCart[i].p.id+')">X</button></td>'
			+'<td><a href="./product.html?id='+productsInCart[i].p.id+'">'+productsInCart[i].p.name+'</a></td>'
			+'<td class="price">'+productsInCart[i].p.price+'&thinsp;$</td>';
			
			// Si la qte est 1 le bouton est disable
			if(productsInCart[i].qte == 1)
				tableRow+='<td><button class="remove-quantity-button" onclick="updateQteInCart('+productsInCart[i].p.id+','+(productsInCart[i].qte-1)+')"disabled>-</button>';
			else
				tableRow+='<td><button class="remove-quantity-button" onclick="updateQteInCart('+productsInCart[i].p.id+','+(productsInCart[i].qte-1)+')">-</button>';	
							
			tableRow+='<span class="quantity" >'+productsInCart[i].qte+'</span>'
			+'<button class="add-quantity-button" onclick="updateQteInCart('+productsInCart[i].p.id+','+(parseInt(productsInCart[i].qte)+1)+')">+</button></td><td id="total-amount">'+(productsInCart[i].p.price*productsInCart[i].qte).toFixed(2);+'&thinsp;$</td></tr>';
			
			document.getElementById('products-tbody').innerHTML+=tableRow;
			
			totalOrderAmount+=(productsInCart[i].p.price*productsInCart[i].qte);
		}
		
		// display total amount
		$("#total-order-amount").html(totalOrderAmount.toFixed(2)+"&thinsp;$");
}	

function deleteFromCart(id)
{
	if(confirm("Voulez-vous supprimer le produit du panier ?"))
	{
		// get Cart in local storage
		var cartJsonString = localStorage.getItem("cart");
	
		// on crée un objet JSON
		var cart = JSON.parse(cartJsonString);
	
		// On supprime l'id passé en paramètre
		for(var i = 0; i<cart.products.length; i++)
			if(cart.products[i].id==id)
      	cart.products.splice(i, 1);
      	
		// on crée le json string et on l'ajoute au localStorage
		localStorage.setItem("cart",JSON.stringify(cart));
	
		// On met à jour le panier
		computeCart();
	}
}

function updateQteInCart(id, qte)
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
		getById(cart.products,id).qte=qte;
	else // s'il n'existe pas, on push le nouvel article
		cart.products.push({id,qte});	 
		
	// on crée le json string et on l'ajoute au localStorage
	localStorage.setItem("cart",JSON.stringify(cart));
	
	// On met à jour le panier
	computeCart();
}

function getById(arr, id) {
    for (var d = 0, len = arr.length; d < len; d += 1) {
        if (arr[d].id === id) {
            return arr[d];
        }
    }
    return null;
}

function clearCart()
{

	if(confirm("Voulez-vous supprimer tous les produits du panier ?"))
	{
		// on vide le cart dans le local storage
		localStorage.setItem("cart",'{"products":[]}');
	
		// On met à jour le panier
		computeCart();
	}
}

function sortByName(key1, key2){
   return key1.p.name > key2.p.name;
}
