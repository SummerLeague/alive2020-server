var path = require("path");


module.exports = function(app, passport) {
  // API ==========================================================================
  [
    "users",
    "sessions",
    "live_photos",
    "story_jobs",
  ].forEach(function (routeName) {
    require(path.resolve("api/controllers/api/v1/" + routeName))(app, passport);
  });
  app.use(app.router);


  // Error Handling ===============================================================
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, "Something broke!");
  });


  // Application ==================================================================
  app.get("*", function(req, res) {
    res.sendfile(path.resolve("public/index.html"));
  });
};
