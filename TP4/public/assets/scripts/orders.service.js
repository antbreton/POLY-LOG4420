var onlineShop = onlineShop || {};

/**
 * Defines a service to manage the orders.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
onlineShop.ordersService = (function() {
    "use strict";

    var self = {};
    var orders = [];

    /**
     * Creates a new order.
     *
     * @param order   The order to create.
     */
    self.createOrder = function(order) {
        if (order) {
            return pushIntoDB(order);
        }
    };

    /**
     * Gets the order based on the specified ID.
     *
     * @param orderId   The ID of the order.
     * @returns {*}     The order associated with the specified ID.
     */
    self.getOrder = function(orderId) {
        if (orderId <= 0 || orderId > orders.length) {
            throw new Error("Invalid order ID specified.")
        }
        return orders[orderId - 1];
    };

    /**
     * Gets the orders count.
     *
     * @returns {Number}  The orders count.
     */
    self.getOrdersCount = function() {
        return orders.length;
    };

    /**
     * Push a new order into mondo DB using the rest API.
     *
     * @private
     */
    function pushIntoDB(order) {
        // get Next Order Id
        return $.ajax({
            url: '/api/orders/next',
            type: 'get',
            contentType: "application/json"
        }).then(function(data) {
            var id = data;
            order.id = parseInt(id) + 1;

            // create the order in db
            return $.ajax({
                url: '/api/orders',
                type: 'post',
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(order)
            }).then(function() {
                return id;
            });
        });
    }

    // Initializes the orders list.
    if (localStorage["orders"]) {
        orders = JSON.parse(localStorage["orders"]);
    }

    return self;
})();