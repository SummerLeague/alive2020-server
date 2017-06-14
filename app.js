#!/usr/bin/env node

// Setup ========================================================================
var path = require("path"),
    env = require("dotenv").load(),
    express = require("express"),
    config = require("config"),
    app = express(),
    server = require("http").createServer(app),
    morgan = require("morgan"),
    io = require("socket.io").listen(server);

var models = require(path.resolve(__dirname, "api/models"));

var passport = require("passport"),
    configPassport = require(path.resolve(__dirname, "config/passport")),
    contentType = require(path.resolve(__dirname, "api/utils/content_type")),
    cookieParser = require("cookie-parser"),
    cookieSession = require("cookie-session"),
    bodyParser = require("body-parser");


// Configure Application  =======================================================
app.use(express.logger());

if (app.get("env") == "development") {
  app.use(morgan("dev"));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
}

if (app.get("env") == "production") {
  app.use(morgan("common"));
  app.configure("production", function() {
    app.use(express.errorHandler());
  });
}

// Init Models ==================================================================
models.sequelize.sync(); // Never use force. Use migrations w/ CLI instead.
// Create models singleton to avoid opening more than one database connection.
app.set("models", models);


// Passport =====================================================================
app.use(cookieParser());
app.use(cookieSession({ secret : config.app.secret }));
app.use(passport.initialize());
configPassport(passport, models.User);


// Routes =======================================================================
app.use(express.methodOverride());
app.use(contentType.overrideContentType());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(app.router);
require("./config/routes")(app, passport);


// Begin Listening ==============================================================
server.listen(config.express.port, function(error) {
  if (error) {
    console.log("Unable to listen for connections: %s", error);
    process.exit(10);
  }
  console.log("🌎  API is running on port: %s", config.express.port);
});
