"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Order = new Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  products: Array
}, { versionKey: false });


var Product = new Schema({
  id: { type: Number, unique: true },
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  features: Array
}, { versionKey: false });

module.exports.Order = mongoose.model("Order", Order);
module.exports.Products = mongoose.model("Product", Product);

mongoose.Promise = global.Promise;

//Initialiser la connexion avec le "connect string" de votre base de données.
mongoose.connect("mongodb://1915928-1747124:ab1915928-1747124@ds113046.mlab.com:13046/online-shop", { useMongoClient: true });

