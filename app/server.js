#!/usr/bin/env node

// Setup ========================================================================
var env      = require("dotenv").load(),
    express  = require("express"),
    config   = require("config"),
    app      = express(),
    path     = require("path"),
    server   = require("http").createServer(app),
    io       = require("socket.io").listen(server),
    _        = require("underscore");


// Configure Aapplication  ======================================================
app.configure(function() {
  app.use(express.favicon(path.resolve(__dirname, "../public/images/favicon.ico")));
  app.use(express.logger());
  app.use(express.methodOverride());
  app.use(express.bodyParser({ uploadDir:"./tmp/uploads/" }));
  app.use(express.static(path.resolve(__dirname, "../live_photos")));
  app.use(express.static(path.resolve(__dirname, "../public")));
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


// Routes =======================================================================
require("../config/routes")(app);


// Connections ==================================================================
require("../config/connections")(io);


// Begin Listening ==============================================================
server.listen(config.express.port, function(error) {
  if (error) {
    console.log("Unable to listen for connections: " + error);
    process.exit(10);
  }
  console.log("Express is listening on port: " + config.express.port);
});
