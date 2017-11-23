var express = require("express");
var routerP = express.Router();

var db = require('../lib/db.js');

// José
routerP.get("/api/shopping-cart/:productId", function(req, res) {
    res.render("index", { title: "OnlineShop - Accueil", active: "accueil" });
});


routerP.get("/api/shopping-cart/", function(req, res) {
    res.render("index", { title: "OnlineShop - Accueil", active: "accueil" });
});


routerP.post("/api/shopping-cart/", function(req, res) {
    res.render("index", { title: "OnlineShop - Accueil", active: "accueil" });
});

// Antoine
routerP.put("/api/shopping-cart/:productId", function(req, res) {

    if (!req.body.hasOwnProperty("quantity"))
        res.status(400).send('{"error":"missing quantity"}');
    else
        next();
}, function(req, res) {
    // get the shopping-cart in db
    panier.findById(1, function(err, user) {
        if (err)
            res.status(504).send('{"error":"missing fetching the cart"}');
        else {

            //find product in cart product list
            if (!panier.products(req.params.productId)) {
                res.status(404).send('{"error":"Product does not exist in cart"}');
            } else {
                panier.products(req.params.productId).quantity = res.param.quantity;
                panier.save(function(err) {
                    if (err)
                        res.status(504).send('{"error":"unable to sabe the cart"}');
                    else
                        res.status(204).send('{"status":"ok"}');
                });
            }
        }
    });
});

routerP.delete("/api/shopping-cart/:productId", function(req, res) {
    panier.findById(1, function(err, user) {
        if (err)
            res.status(504).send('{"error":"missing fetching the cart"}');
        else {

            //find product in cart product list
            if (!panier.product(req.params.productId)) {
                res.status(404).send('{"error":"Product does not exist in cart"}');
            } else {
                // Remove product in the cart
                panier.products(req.params.productId);

                panier.save(function(err) {
                    if (err)
                        res.status(504).send('{"error":"unable to sabe the cart"}');
                    else
                        res.status(204).send('{"status":"ok"}');
                });

            }
        }
    });
});

routerP.delete("/api/shopping-cart/:productId", function(req, res) {
    panier.findById(1, function(err, user) {
        if (err)
            res.status(504).send('{"error":"missing fetching the cart"}');
        else {

            //find product in cart product list
            if (!panier.product(req.params.productId)) {
                res.status(404).send('{"error":"Product does not exist in cart"}');
            } else {
                // Remove all products
                panier.products = [];

                panier.save(function(err) {
                    if (err)
                        res.status(504).send('{"error":"unable to sabe the cart"}');
                    else
                        res.status(204).send('{"status":"ok"}');
                });

            }
        }
    });
});


module.exports = routerP;