$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function clearCart()
{

		// on vide le cart dans le local storage
		localStorage.setItem("cart",'{"products":[]}');

		// On met a jour le badge
		computeBadge();

}

$(document).ready(() => {
    clearCart();
    var query = getQueryParams(document.location.search);
    var orderNum = query.orderNum;
    if (orderNum) {
    	document.getElementById("confirmation-number").innerHTML=orderNum;
    }

    var name = query.name;
    if (name) {
    	document.getElementById("name").innerHTML=name;
    }



});
