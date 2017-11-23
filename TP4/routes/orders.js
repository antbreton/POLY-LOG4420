var express = require("express");
var routerP = express.Router();

var db = require('../lib/db.js');

routerP.get("/api/orders/next", function(req, res) {
    //res.status(204).send('{"status":"ok"}');
    // res.json({ "status": "ok" });
    db.Orders.findOne().sort({ id: -1 }).exec(function(err, post) {
        if (err) {
            res.send(err);
        } else //res.setHeader('Content-Type','application/json');
            res.json(post.id);
    });
    // Lire la DB trier
});

//1
routerP.get("/api/orders", function(req, res) {

    // Lire la DB trier
    db.Orders.find({}, function(err, productsR) {
        if (err) {
            res.send(err);
        }
        //res.setHeader('Content-Type','application/json');
        res.json(productsR);
    });
});

//2
routerP.get("/api/orders/:id", function(req, res) {

    // Lire la DB trier
    db.Orders.find({ id: req.params.id }, function(err, order) {
        if (err) {
            res.send(err);
        }
        res.json(order);
    });

});



//3
/* Waiting for that kind of params
 *{"id": 1, "firstName": "Antoine","lastName": "Béland","email": "antoine.beland@polymtl.ca","phone": "514-340-4711","products": [{"id": 1,"quantity": 2},{"id": 2,"quantity": 1}]
 */
routerP.post("/api/orders/", function(req, res, next) { // check "if there is no missing parameter" middleware

        if (!req.body.hasOwnProperty("id"))
            res.status(400).send('{"error":"missing id param"}');
        else if (!req.body.hasOwnProperty("firstName"))
            res.status(400).send('{"error":"missing firstName param"}');
        else if (!req.body.hasOwnProperty("lastName"))
            res.status(400).send('{"error":"missing lastName param"}');
        else if (!req.body.hasOwnProperty("email"))
            res.status(400).send('{"error":"missing email param"}');
        else if (!req.body.hasOwnProperty("phone"))
            res.status(400).send('{"error":"missing phone param"}');
        else if (!req.body.hasOwnProperty("products"))
            res.status(400).send('{"error":"missing products param"}');
        else
            next();

    }, function(req, res, next) { // check "is id unique" middleware

        db.Orders.find({ id: req.params.id }, function(err, orders) {
            if (orders.length != 0)
                res.status(400).send('{"error":"order id already exists."}');
            else
                next();
        });

    }, function(req, res, next) { // check "if all products exist in db" middleware

        success = 1;

        var products_ids = [];

        // iterate over the products array
        for (var i = 0;
            (i < req.body.products.length) && success; i++) {

            // check if it contains an id property
            if (!req.body.products[i].hasOwnProperty("id")) {
                res.status(400).send('{"error":"missing id property in object products"}');
                success = 0;
            }

            // Create an id array for the mangoose request
            products_ids.push(req.body.products[i].id);
        }

        // Requests for all products
        db.Products.find({ id: { $in: products_ids } },
            function(err, products) {
                // if the resulting array length is different than the initial id list length, then a product doesnt exist
                if (products.length != products_ids.length) {
                    res.status(400).send('{"error":"a product does not exist !"}');

                } else
                if (success)
                    next();
            });
    },
    function(req, res, next) { // "save the order" middleware

        var newOrder = db.Orders(req.body);

        // save the user
        newOrder.save(function(err) {
            if (err) {
                res.status(400).send('{"error":"unable to save new order."}');
                console.log(err);
            } else
                res.status(201).send('{"status":"ok"}');
        });
    });

// 4
routerP.delete("/api/orders/:id", function(req, res) {

    // Lire la DB trier
    db.Orders.findOneAndRemove({ id: req.params.id }, function(err, order) {
        if (err) {
            res.status(404).send('{"error":"unable to save new order."}');
        }
        res.status(204).send('{"status":"ok"}');
    });
});

// 5
routerP.delete("/api/orders/", function(req, res) {

    // Lire la DB trier
    db.Orders.remove({}, function(err, order) {
        if (err) {
            res.send(err);
        }
        res.status(204).send('{"status":"ok"}');
    });

});




module.exports = routerP;