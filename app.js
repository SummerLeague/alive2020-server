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
app.use(express.favicon(path.resolve(__dirname, "public/images/favicon.ico")));
app.use(express.static(path.resolve(__dirname, "public/")));
app.use(express.logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
models.sequelize.sync({ alter : true });
// Create models singleton to avoid opening more than one database connection.
app.set("models", models);


// Passport =====================================================================
app.use(cookieParser());
app.use(cookieSession({ secret : config.app.secret }));
app.use(passport.initialize());
app.use(passport.session());
configPassport(passport, models.User);
// Create passport singleton so that middleware can access our configured passport.
app.set("passport", passport);


// Routes =======================================================================
app.use(app.router);
app.use(express.methodOverride());
app.use(contentType.overrideContentType());
require("./config/routes")(app);


// Socket Connections ===========================================================
require("./config/connections")(io);


// Begin Listening ==============================================================
server.listen(config.express.port, function(error) {
  if (error) {
    console.log("Unable to listen for connections: %s", error);
    process.exit(10);
  }
  console.log("🌎  API is running on port: %s", config.express.port);
});
