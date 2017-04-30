#!/usr/bin/env node

// Setup ========================================================================
var path = require("path"),
    env = require("dotenv").load(),
    express = require("express"),
    config = require("config"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server);

var passport = require("passport"),
    content_type = require(path.resolve(__dirname, "api/utils/content_type")),
    models = require(path.resolve(__dirname, "api/models")),
    configPassport = require(path.resolve(__dirname, "config/passport"));


// Configure Aapplication  ======================================================
app.configure(function() {
  app.use(express.favicon(path.resolve(__dirname, "public/images/favicon.ico")));
  app.use(express.logger());
  app.use(express.methodOverride());
  app.use(content_type.overrideContentType());
  app.use(express.session({ secret : config.app.secret }));
  app.use(express.cookieParser());
  app.use(express.bodyParser({ uploadDir : path.resolve(__dirname, "tmp/uploads/") }));
  app.use(express.static(path.resolve(__dirname, "public/")));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

app.configure("development", function() {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure("production", function() {
  app.use(express.errorHandler());
});


// Init Models ==================================================================
models.sequelize.sync({ alter : true });
// Create models singleton to avoid opening more than one database connection.
app.set("models", models);

// Passport =====================================================================
configPassport(passport, models.User);
app.set("passport", passport);


// Routes =======================================================================
require("./config/routes")(app);


// Connections ==================================================================
require("./config/connections")(io);


// Begin Listening ==============================================================
server.listen(config.express.port, function(error) {
  if (error) {
    console.log("Unable to listen for connections: %s", error);
    process.exit(10);
  }
  console.log("🌎  API is running on port: %s", config.express.port);
});
