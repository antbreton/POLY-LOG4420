var onlineShop = onlineShop || {};

/**
 * Defines a service to manage the shopping cart.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
onlineShop.shoppingCartService = (function($, productsService, shoppingcartcontroller) {
    "use strict";

    var self = {};
    var items = {};

    /**
     * Adds an item in the shopping cart.
     *
     * @param productId   The ID associated with the product to add.
     * @param [quantity]  The quantity of the product.
     */
    self.addItem = function(productId, quantity) {
        if (productId === undefined) {
            throw new Error("The specified product ID is invalid.")
        }
        if (!quantity || typeof quantity !== "number" || quantity <= 0) {
            quantity = 1;
        }
        /*
                if (items[productId]) {
                  items[productId] += quantity;
                } else {
                  items[productId] = quantity;
                }
                _updateLocalStorage();*/
        return $.ajax({
            url: '/api/shopping-cart',
            type: 'post',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({ "quantity": quantity, "productId": productId })
        });
    };

    /**
     * Gets the items in the shopping cart.
     *
     * @returns {jquery.promise}    A promise that contains the list of items in the shopping cart.
     */
    self.getItems = function() {

        // Get a list of {productId,qty}
        return $.ajax({
            url: '/api/shopping-cart',
            type: 'get',
            contentType: "application/json"
        }).then(function(data) {
            var res = [];
            // For each pair in the previous list
            data.forEach(function(element) {

                // We send a new synchronous ajax request for getting the product informations
                $.ajax({
                    url: '/api/products/' + element.productId,
                    type: 'get',
                    contentType: "application/json",
                    async: false,
                    success: function(productRes) {

                        // We add the result in a list
                        res.push({
                            product: productRes,
                            quantity: element.quantity
                        });
                    }
                });
            }, this);

            return res;
        });
    };

    /**
     * Gets the items count in the shopping cart.
     *
     * @returns {number}  The items count.
     */
    self.getItemsCount = function() {
        return $.ajax({
            url: '/api/shopping-cart',
            type: 'get',
            contentType: "application/json"
        }).then(function(data) {
		var total = 0; 
		data.forEach(function(p) {
			total += p.quantity;
		});
		return total; 
	});
    };

    /**
     * Gets the quantity associated with an item.
     *
     * @param productId   The product ID associated with the item quantity to retrieve.
     * @returns {*}
     */
    self.getItemQuantity = function(productId) {
        return items[productId] || 0;
    };

    /**
     * Gets the total amount of the products in the shopping cart.
     *
     * @returns {jquery.promise}    A promise that contains the total amount.
     */
    self.getTotalAmount = function() {

        var total = 0;
        $(".price").each(function(i, element) {
            var price = $(element).html().replace('$', '').replace(',', '.');
            console.log(price);
            total += parseFloat(price);
        })
        return total;
    };

    /**
     * Updates the quantity associated with a specified item.
     *
     * @param productId   The product ID associated with the item to update.
     * @param quantity    The item quantity.
     */
    self.updateItemQuantity = function(productId, quantity) {
        if (!quantity || typeof quantity !== "number" || quantity <= 0) {
            throw new Error("The specified quantity is invalid.")
        }
        return $.ajax({
            url: '/api/shopping-cart/' + productId,
            type: 'put',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({ "quantity": quantity }),
        });

    };

    /**
     * Removes the specified item in the shopping cart.
     *
     * @param productId   The product ID associated with the item to remove.
     */
    self.removeItem = function(productId) {
        return $.ajax({
            url: '/api/shopping-cart/' + productId,
            type: 'delete',
            dataType: 'json',
            contentType: "application/json"
        });
    };

    /**
     * Removes all the items in the shopping cart.
     */
    self.removeAllItems = function() {
        return $.ajax({
            url: '/api/shopping-cart/',
            type: 'delete',
            dataType: 'json',
            contentType: "application/json"
        });
    };

    /**
     * Updates the shopping cart in the local storage.
     *
     * @private
     */
    function _updateLocalStorage() {
        localStorage["shoppingCart"] = JSON.stringify(items);
    }

    // Initializes the shopping cart.
    if (localStorage["shoppingCart"]) {
        items = JSON.parse(localStorage["shoppingCart"]);
    }

    return self;
})(jQuery, onlineShop.productsService);
