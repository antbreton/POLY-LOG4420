var express = require("express");
var routerP = express.Router();

var db = require('../lib/db.js');

routerP.get("/api/products", function(req, res) {

	// Lire la DB trier
	db.Products.find({}, function(err, productsR) {
	if (err)
	{
		res.send(err);
	}
		//res.setHeader('Content-Type','application/json');
		res.json(productsR);
	});
});

routerP.get("/api/products/:id", function(req, res) {
  res.render("index", { title: "OnlineShop - Accueil", active: "accueil" });
});


routerP.post("/api/products/:id", function(req, res) {
  res.render("index", { title: "OnlineShop - Accueil", active: "accueil" });
});


routerP.delete("/api/products/:id", function(req, res) {
  res.render("index", { title: "OnlineShop - Accueil", active: "accueil" });
});

routerP.delete("/api/products/:id", function(req, res) {
  res.render("index", { title: "OnlineShop - Accueil", active: "accueil" });
});

module.exports = routerP;
