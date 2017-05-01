var Sequelize = require("sequelize");

// Actions ======================================================================
function create(req, res, next) {
  var models = req.app.get("models"),
      username = req.body.username,
      email = req.body.email,
      password = req.body.password;

  models.User.create({
    username : username,
    email : email,
    password : password,
  })
  .then(function() {
    return res.send(200, {
      user : {
        id : this.id,
        username : this.username,
        email : this.email,
        password : this.password
      }
    });
  })
  .catch(Sequelize.ValidationError, function (err) {
    var error = err.errors[0],
        message = error ? error.message : "Invalid parameters.";

    return res.send(422, { message : message });
  }).catch(function(err) {
    next(err);
  });
};


// Exports ======================================================================
module.exports = function(app) {
  app.post("/api/v1/users", create);
}
