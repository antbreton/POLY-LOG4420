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
  res.render("index", { title: "OnlineShop - Accueil", active: "accueil" });
});

routerP.delete("/api/shopping-cart/:productId", function(req, res) {
  res.render("index", { title: "OnlineShop - Accueil", active: "accueil" });
});

routerP.delete("/api/shopping-cart/:productId", function(req, res) {
  res.render("index", { title: "OnlineShop - Accueil", active: "accueil" });
});


module.exports = routerP;
