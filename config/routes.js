module.exports = function(app) {
  // API ==========================================================================
  [
    "live_photos"
  ].forEach(function (routeName) {
    require("app/controllers/" + routeName)(app);
  });
  app.use(app.router);


  // Error Handling ===============================================================
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, "Something broke!");
  });


  // Application ==================================================================
  app.get("*", function(req, res) {
    res.sendfile("./public/index.html"); // Load the single view file (angular will handle the page changes on the front-end)
  });
};
