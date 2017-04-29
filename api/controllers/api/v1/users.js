var path = require("path"),
    models = require(path.resolve("api/models"));


// Controllers ==================================================================
function create(req, res) {
  models.User.register(models.User.build({ username : req.body.username }), req.body.password, function(err, user) {
    console.log("Error registering user: %s", err);
    if (err) {
      return res.send(422, {
				error : err
			});
    }

    return res.send(200, {
    	user : {
				id : user.id,
				username : user.username
			}
    });
  });
};


// Exports ======================================================================
module.exports = function(app) {
  app.post("/api/v1/users", create);
}
