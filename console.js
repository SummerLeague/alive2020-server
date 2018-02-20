var repl = require("repl");

var path = require("path"),
    env = require("dotenv").load(),
    express = require("express"),
    config = require("config");

var models = require(path.resolve(__dirname, "api/models"));

// open the repl session
var replServer = repl.start({
  prompt: ">  "
});

// attach modules to the repl context
replServer.context.models = models;
