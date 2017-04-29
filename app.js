#!/usr/bin/env node

// Setup ========================================================================
var env = require("dotenv").load(),
    express = require("express"),
    config = require("config"),
    app = express(),
    path = require("path"),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server),
    _ = require("underscore"),
    content_type = require("./api/utils/content_type"),
    models = require("./api/models"),
    auth = require("./api/utils/auth");


// Configure Aapplication  ======================================================
app.configure(function() {
  app.use(express.favicon(path.resolve(__dirname, "public/images/favicon.ico")));
  app.use(express.logger());
  app.use(express.methodOverride());
  app.use(content_type.overrideContentType());
  app.use(express.session({ secret : config.app.secret }));
  app.use(auth.initialize());
  app.use(auth.session());
  app.use(express.cookieParser());
  app.use(express.bodyParser({ uploadDir:"./tmp/uploads/" }));
  app.use(express.static(path.resolve(__dirname, "public/")));
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
models.sequelize.sync();


// Routes =======================================================================
require("./config/routes")(app);


// Connections ==================================================================
require("./config/connections")(io);


// Begin Listening ==============================================================
server.listen(config.express.port, function(error) {
  if (error) {
    console.log("Unable to listen for connections: " + error);
    process.exit(10);
  }
  console.log("Express is listening on port: " + config.express.port);
});
