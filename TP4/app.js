var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

require("./lib/db");
var index = require("./routes/index");
var produits = require("./routes/produits");
<<<<<<< HEAD
var orders = require("./routes/orders");
=======
var panier = require("./routes/panier");
>>>>>>> 9698dc7c0f83fe4c978e7acb6105f9b92e84793e

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

if(process.env.NODE_ENV !== 'test') {
  app.use(logger("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// initialize the session
app.use(session({
  secret: 'log4420',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Bind our APIs
app.use("/", index);
app.use("/", produits);
<<<<<<< HEAD
app.use("/", orders);
=======
app.use("/", panier);
>>>>>>> 9698dc7c0f83fe4c978e7acb6105f9b92e84793e

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



module.exports = app;
