var express = require("express");
var router = express.Router();

//var productCallback = requires("produits.js");

//router.get("api/produits",productCallback);

router.get("/", function(req, res) {
    res.render("index", { title: "OnlineShop - Accueil", active: "accueil" });
});

router.get("/accueil", function(req, res) {
    res.render("index", { title: "OnlineShop - Accueil", active: "accueil" });
});

router.get("/produits", function(req, res) {
    res.render("produits", { title: "OnlineShop - Produits", active: "produits" });
});

router.get("/produit", function(req, res) {
    res.render("produit", { title: "OnlineShop - Produit", active: "produits" });
});

router.get("/contact", function(req, res) {
    res.render("contact", { title: "OnlineShop - Contact", active: "contact" });
});

router.get("/panier", function(req, res) {
    res.render("panier", { title: "OnlineShop - Panier" });
});

router.get("/commande", function(req, res) {
    res.render("commande", { title: "OnlineShop - Commande" });
});

router.get("/confirmation", function(req, res) {
    res.render("confirmation", { title: "OnlineShop - Confirmation", id: req.query.id, name: req.query.name });
});

module.exports = router;