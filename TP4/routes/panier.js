var express = require("express");
var routerP = express.Router();

var db = require('../lib/db.js');

// José

routerP.get("/api/shopping-cart/", function(req, res) {
  if (!req.session.shopping_cart) {
    req.session.shopping_cart = [];
  }
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(req.session.shopping_cart, null, 2));
});

routerP.get("/api/shopping-cart/:productId", function(req, res) {
  if (!req.session.shopping_cart) {
    req.session.shopping_cart = [];
    res.sendStatus(404);
    return;
  }

	if (isNaN(parseInt(req.params.productId))) {
		res.sendStatus(404);
		return;
  } 
  
  var checkExistence = (current) => {
    if (current.productId == req.params.productId) {
      return true;
    } 
    return false;
  };
  var p = req.session.shopping_cart.find(checkExistence);
  if (p) {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(p, null, 2));
  } else {
    res.sendStatus(404);
  }
});

routerP.post("/api/shopping-cart/", function(req, res) {
  if (!req.session.shopping_cart) {
    req.session.shopping_cart = [];
  }

  // Verify productId on db insert
	var checkExistence = (err, p) => {
		if (err) {
			console.log("Erreur lors du db.findOne : " + err);
			res.send(err);
			return;
    }
		if (p) {
      // Verify quantity
      if (!req.body.quantity || req.body.quantity.constructor != Number || req.body.quantity <= 0) {
        res.sendStatus(400);
        return;
      } 

      var matchingCartProduct = (current) => {
        if (current.productId == req.body.productId) {
          return true;
        } 
        return false;
      };
      var cp = req.session.shopping_cart.find(matchingCartProduct);
      if (!cp) {
        req.session.shopping_cart.push({"productId":req.body.productId,"quantity":req.body.quantity});
        res.sendStatus(201);
      } else {
        res.sendStatus(400);
      }
		} else {	
			res.sendStatus(400);
		}
	};
	db.Products.findOne({"id" : req.body.productId}, '-_id', checkExistence);
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
