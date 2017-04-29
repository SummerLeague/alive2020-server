var fs = require("fs"),
  	path = require("path"),
  	Sequelize = require("sequelize"),
  	env = process.env.NODE_ENV || "development",
  	config = require("config"),
  	db = {};


var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
