var express = require("express");
var initProducts = require("../public/data/products.json");
var routerP = express.Router();

var db = require('../lib/db.js');

routerP.get("/api/products/reset/", function(req, res) {
	var internalError = function(err) {
		console.log(err);
		res.sendStatus(500);
		return;
	};
	var confirmInsert = function (docs) {
		if (docs)
		{
			res.sendStatus(200);
		}
	};
	db.Products.remove().then(function() {return db.Products.insertMany(initProducts);}, internalError).then(confirmInsert, internalError);
});

routerP.get("/api/products/", function(req, res) {
	var sortAndSend =  (err, productsR) => {
		if (err)
		{
			console.log("Erreur lors du db.find : " + err);
			res.send(err);
			return;
		}

		switch (req.query.criteria) {
			case "alpha-asc":
				productsR.sort((a,b) => {
					var p1 = a.name.toLowerCase(), p2 = b.name.toLowerCase();
					if (p1 > p2) return 1;
					if (p1 < p2) return -1;
					return 0;
				}); 
				break;
			case "alpha-dsc": 
				productsR.sort((a,b) => {
					var p1 = a.name.toLowerCase(), p2 = b.name.toLowerCase();
					if (p1 > p2) return -1;
					if (p1 < p2) return 1;
					return 0;
				}); 
				break;
			case "price-dsc": 
				productsR.sort((a,b) => {
					return a.price < b.price;
				});
				break;
			case "price-asc": 
			default:
				productsR.sort((a,b) => {
					return a.price > b.price;
				});
		}
		// TODO: Put this in a middleware
		res.set('Content-Type', 'application/json');
		res.send(JSON.stringify(productsR, null, 2));
	};
	switch (req.query.criteria) {
		case "price-asc": 
		case "price-dsc": 
		case "alpha-asc": 
		case "alpha-dsc":
		case undefined:
			break;
		default:
			res.sendStatus(400);
			return;
	}
	switch (req.query.category) {
		case "cameras" :
		case "computers" :
		case "consoles" :
		case "screens" :
			db.Products.find({"category" : req.query.category}, '-_id', sortAndSend);
			break;
		case undefined :
			db.Products.find({}, '-_id', sortAndSend);
			break;
		default :
			res.sendStatus(400);
			return;
	}
});

routerP.get("/api/products/:id", function(req, res) {
	if (isNaN(parseInt(req.params.id))) {
		res.sendStatus(404);
		return;
	} 

	var checkExistence = (err, p) => {
		if (err) {
			console.log("Erreur lors du db.findOne : " + err);
			res.send(err);
			return;
		}
		if (p) {
			// TODO: Put this in a middleware
			res.set('Content-Type', 'application/json');
			res.send(JSON.stringify(p, null, 2));
		} else {	
			res.sendStatus(404);
		}
	};
	db.Products.findOne({"id" : req.params.id}, '-_id', checkExistence);
});


routerP.post("/api/products/", function(req, res) {
	// Verify id on insert
	//
	// Verify name
	console.log(req.body);
	if (!req.body.name || req.body.name.constructor != String || req.body.name == "") {
		res.sendStatus(400);
		return;
	}
	// Verify price
	if (!req.body.price || req.body.price.constructor != Number || req.body.price <= 0) {
		res.sendStatus(400);
		return;
	}
	// Verify image
	if (!req.body.image || req.body.image.constructor != String || req.body.image == "") {
		res.sendStatus(400);
		return;
	}
	// Verify category
	if (!req.body.category || req.body.category.constructor != String || (req.body.category != "cameras" && req.body.category != "computers" && req.body.category != "consoles" && req.body.category != "screens")) {
		res.sendStatus(400);
		return;
	}
	
	// Verify description
	if (!req.body.description || req.body.description.constructor != String || req.body.description == "") {
		res.sendStatus(400);
		return;
	}
	// Verify features
	if (!req.body.features || req.body.features.constructor != Array || req.body.features.length == 0){
		res.sendStatus(400);
		return;
	}
	for (var i = 0; i < req.body.features.length; i++) {
		if (req.body.features[i].constructor != String || req.body.features[i] == "") {
			res.sendStatus(400);
			return;
		}
	}

	// Insert
	var p = new db.Products({
		"id":req.body.id,
		"name":req.body.name,
		"price":req.body.price,
		"image":req.body.image,
		"category":req.body.category,
		"description":req.body.description,
		"features":req.body.features,
	});

	p.save((err, savedp) => {
		if (err) {
			if (err.code == 11000) {
				res.sendStatus(400);
				return;
			} else {
				console.log("Erreur lors du save : " + err);
				res.sendStatus(500);
				return;
			}
		}
		res.sendStatus(201);
	});	
});


routerP.delete("/api/products/:id", function(req, res) {
	if (isNaN(parseInt(req.params.id))) {
		res.sendStatus(404);
		return;
	} 

	var checkExistence = (err, p) => {
		if (err) {
			console.log("Erreur lors du findOneAndRemove : " + err);
			res.sendStatus(500);
			return;
		}
		if (p) {
			// TODO: Put this in a middleware
			res.sendStatus(204);
		} else {	
			res.sendStatus(404);
		}
	};
	db.Products.findOneAndRemove({"id": req.params.id}, checkExistence);
});

routerP.delete("/api/products/", function(req, res) {
	var checkErrors = (err) => {
		if (err) {
			console.log("Erreur lors du remove : " + err);
			res.sendStatus(500);
			return;
		}
		res.sendStatus(204);
	};
	db.Products.remove({}, checkErrors);
});

module.exports = routerP;
